const axios = require('axios')
const request = require('request')
const config = require('./../../config')
const ClientId = config.MANGOPAY_CLIENTID
const URL = config.MANGOPAY_URL // `https://api.sandbox.mangopay.com/v2.01/
const token = config.MANGOPAY_TOKEN
const errorMessage = 'Internal Error'

class Mangopay {
  async createUser({ sFirstName, sLastName, sEmail, tDob }) {
    return new Promise((resolve, reject) => {
      axios.post(`${URL}${ClientId}/users/natural/`,
        {
          FirstName: sFirstName,
          LastName: sLastName,
          Birthday: tDob,
          Nationality: 'FR',
          CountryOfResidence: 'FR',
          Email: sEmail
        },
        {
          headers: {
            Authorization: token
          }
        })
        .then(response => {
          resolve(response.data)
        }).catch(error => {
          if (error.response) reject(JSON.stringify(error.response.data))
          else reject(errorMessage)
        })
    })
  }

  async createWallet({ nUserId, sDescription = 'Base Wallet', sCurrency = 'EUR', sTag = 'simple wallet' }) {
    return new Promise((resolve, reject) => {
      axios.post(`${URL}${ClientId}/wallets`,
        {
          Tag: sTag,
          Owners: [nUserId],
          Description: sDescription,
          Currency: sCurrency
        }, {
          headers: {
            Authorization: token
          }
        })
        .then(response => {
          resolve(response.data)
        }).catch(error => {
          if (error.response) reject(JSON.stringify(error.response.data))
          else reject(errorMessage)
        })
    })
  }

  async cardRegister({ nUserId, sCurrency = 'EUR', sCardType = 'CB_VISA_MASTERCARD', nCardNumber = '', nExpirationDate = '', nCvx = '', sTag = '' }) {
    return new Promise((resolve, reject) => {
      axios.post(`${URL}${ClientId}/cardregistrations`,
        {
          Tag: sTag,
          UserId: nUserId,
          Currency: sCurrency,
          CardType: sCardType
        }, {
          headers: {
            Authorization: token
          }
        })
        .then(response => {
          if (response.data && response.data.Status === 'ERROR') {
            reject(response.data.ResultMessage)
          }
          let cardRegistrationData = {
            data: response.data.PreregistrationData,
            accessKeyRef: response.data.AccessKey,
            cardNumber: nCardNumber,
            cardExpirationDate: nExpirationDate,
            cardCvx: nCvx,
            returnURL: 'http://www.example.com'
          }
          // Set the headers
          let headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
          }

          // Configure the request
          let options = {
            url: response.data.CardRegistrationURL,
            method: 'POST',
            headers: headers,
            form: cardRegistrationData
          }

          request.post(options,
            function (error, response2, body) {
              if (error) {
                reject(JSON.stringify(body))
              } else {
                let query = response2.headers.location.split('?')[1]
                axios.put(`${URL}${ClientId}/CardRegistrations/${response.data.Id}`, {
                  RegistrationData: query
                }).then(response => {
                  if (response.data && response.data.Status === 'ERROR') {
                    reject(response.data.ResultMessage)
                  }
                  resolve(response.data)
                }).catch(error => {
                  if (error.response) reject(JSON.stringify(error.response.data))
                  else reject(errorMessage)
                })
              }
            }
          )
        }).catch(error => {
          if (error.response) reject(JSON.stringify(error.response.data))
          else reject(errorMessage)
        })
    })
  }

  async cardDeactivate({ nCardId = '' }) {
    return new Promise((resolve, reject) => {
      axios.put(`${URL}${ClientId}/cards/${nCardId}`,
        {
          Active: false
        }, {
          headers: {
            Authorization: token
          }
        })
        .then(response => {
          resolve(response.data)
        }).catch(error => {
          if (error.response) reject(JSON.stringify(error.response.data))
          else reject(errorMessage)
        })
    })
  }

  async listCards({ nUserId = '', nPage = 1, nPerPage = 200 }) {
    return new Promise((resolve, reject) => {
      axios.get(`${URL}${ClientId}/users/${nUserId}/cards?Page=${nPage}&Per_Page=${nPerPage}`, {
        headers: {
          Authorization: token
        }
      }).then(response => {
        resolve(response.data)
      }).catch(error => {
        if (error.response) reject(JSON.stringify(error.response.data))
        else reject(errorMessage)
      })
    })
  }

  async registeredCardPayin({ nUserId, nWalletId, nCardId, sCurrency = 'EUR', nAmount = 0, nFees = 0 }) {
    return new Promise((resolve, reject) => {
      axios.post(`${URL}${ClientId}/payins/card/direct`,
        {
          AuthorId: nUserId,
          CreditedWalletId: nWalletId,
          DebitedFunds: {
            Currency: sCurrency,
            Amount: nAmount
          },
          Fees: {
            Currency: sCurrency,
            Amount: nFees
          },
          SecureModeReturnURL: 'http://www.example.com',
          CardId: nCardId,
          SecureMode: 'DEFAULT'
          // 'StatementDescriptor': 'Mar2016'
        }, {
          headers: {
            Authorization: token
          }
        })
        .then(response => {
          resolve(response.data)
        }).catch(error => {
          if (error.response) reject(JSON.stringify(error.response.data))
          else reject(errorMessage)
        })
    })
  }

  async webPayin({ nUserId, nWalletId, sCurrency = 'EUR', nAmount = 0, nFees = 0, sReturnURL = 'http://www.example.com/returnURL', sStatementDescriptor = '' }) {
    return new Promise((resolve, reject) => {
      axios.post(`${URL}${ClientId}/payins/card/web`,
        {
          AuthorId: nUserId,
          CreditedWalletId: nWalletId,
          DebitedFunds: {
            Currency: sCurrency,
            Amount: nAmount
          },
          Fees: {
            Currency: sCurrency,
            Amount: nFees
          },
          ReturnURL: 'http://www.example.com/returnURL',
          CardType: 'CB_VISA_MASTERCARD',
          SecureMode: 'DEFAULT',
          Culture: 'EN',
          // 'TemplateURLOptions': {
          //   'Payline': 'https://www.mysite.com/template/'
          // },
          StatementDescriptor: sStatementDescriptor
        },
        {
          headers: {
            Authorization: token
          }
        })
        .then(response => {
          resolve(response.data)
        }).catch(error => {
          if (error.response) reject(JSON.stringify(error.response.data))
          else reject(errorMessage)
        })
    })
  }

  async viewPayIn({ nPayInId }) {
    return new Promise((resolve, reject) => {
      axios.get(`${URL}${ClientId}/payins/${nPayInId}`,
        {
          headers: {
            Authorization: token
          }
        })
        .then(response => {
          resolve(response.data)
        }).catch(error => {
          if (error.response) reject(JSON.stringify(error.response.data))
          else reject(errorMessage)
        })
    })
  }

  async payInRefund({ nPayInId, nDebitedFunds, nFees, nUserId }) {
    return new Promise((resolve, reject) => {
      axios.post(`${URL}${ClientId}/payins/${nPayInId}/refunds`,
        {
          AuthorId: nUserId,
          DebitedFunds: {
            Currency: 'EUR',
            Amount: nDebitedFunds
          },
          Fees: {
            Currency: 'EUR',
            Amount: nFees
          }
        },
        {
          headers: {
            Authorization: token
          }
        })
        .then(response => {
          resolve(response.data)
        }).catch(error => {
          if (error.response) reject(JSON.stringify(error.response.data))
          else reject(errorMessage)
        })
    })
  }

  async transferMoney({ nSenderId, nReceiverId, nAmount, nFees, nSenderWalletId, nReceiverWalletId }) {
    return new Promise((resolve, reject) => {
      axios.post(`${URL}${ClientId}/transfers`,
        {
          AuthorId: nSenderId,
          CreditedUserId: nReceiverId,
          DebitedFunds: {
            Currency: 'EUR',
            Amount: nAmount // had to multiply by 100 as mangopay accepts in lowest currency frection
          },
          Fees: {
            Currency: 'EUR',
            Amount: nFees // cut out the fees on transfer
          },
          DebitedWalletId: nSenderWalletId,
          CreditedWalletId: nReceiverWalletId
        },
        {
          headers: {
            Authorization: token
          }
        })
        .then(response => {
          resolve(response.data)
        }).catch(error => {
          if (error.response) reject(JSON.stringify(error.response.data))
          else reject(errorMessage)
        })
    })
  }

  async makePayout({ nUserId, nAmount, nFees, nBankId, nWalletId }) {
    return new Promise((resolve, reject) => {
      axios.post(`${URL}${ClientId}/payouts/bankwire`,
        {
          AuthorId: nUserId,
          BankAccountId: nBankId,
          DebitedWalletId: nWalletId,
          DebitedFunds: {
            Currency: 'EUR',
            Amount: nAmount
          },
          Fees: {
            Currency: 'EUR',
            Amount: nFees
          },
          BankWireRef: ''
        }, {
          headers: {
            Authorization: token
          }
        })
        .then(response => {
          resolve(response.data)
        }).catch(error => {
          if (error.response) reject(JSON.stringify(error.response.data))
          else reject(errorMessage)
        })
    })
  }

  async createKycDocument({ nUserId }) {
    return new Promise((resolve, reject) => {
      axios.post(`${URL}${ClientId}/users/${nUserId}/kyc/documents/`,
        {
          Type: 'IDENTITY_PROOF'
        }, {
          headers: {
            Authorization: token
          }
        })
        .then(response => {
          resolve(response.data)
        }).catch(error => {
          if (error.response) reject(JSON.stringify(error.response.data))
          else reject(errorMessage)
        })
    })
  }

  async kycAddPage({ nUserId, nKycId, base64String }) {
    return new Promise((resolve, reject) => {
      axios.post(`${URL}${ClientId}/users/${nUserId}/kyc/documents/${nKycId}/pages`,
        {
          File: base64String // Base64 string
        }, {
          headers: {
            Authorization: token
          }
        })
        .then(response => {
          resolve(response.data)
        }).catch(error => {
          if (error.response) reject(JSON.stringify(error.response.data))
          else reject(errorMessage)
        })
    })
  }

  async kycSubmit({ nUserId, nKycId }) {
    return new Promise((resolve, reject) => {
      axios.put(`${URL}${ClientId}/users/${nUserId}/kyc/documents/${nKycId}`,
        {
          Status: 'VALIDATION_ASKED'
        }, {
          headers: {
            Authorization: token
          }
        })
        .then(response => {
          resolve(response.data)
        }).catch(error => {
          if (error.response) reject(JSON.stringify(error.response.data))
          else reject(errorMessage)
        })
    })
  }

  async viewKyc({ nKycId }) {
    return new Promise((resolve, reject) => {
      axios.get(`${URL}${ClientId}/kyc/documents/${nKycId}`, {
        headers: {
          Authorization: token
        }
      }).then(response => {
        resolve(response.data)
      }).catch(error => {
        if (error.response) reject(JSON.stringify(error.response.data))
        else reject(errorMessage)
      })
    })
  }

  async addBankAccount({ nUserId, oOwnerAddress, sOwnerName, IBAN, BIC }) {
    return new Promise((resolve, reject) => {
      axios.post(`${URL}${ClientId}/users/${nUserId}/bankaccounts/iban`,
        {
          OwnerAddress: oOwnerAddress,
          OwnerName: sOwnerName,
          IBAN,
          BIC
        }, {
          headers: {
            Authorization: token
          }
        })
        .then(response => {
          resolve(response.data)
        }).catch(error => {
          if (error.response) reject(JSON.stringify(error.response.data))
          else reject(errorMessage)
        })
    })
  }

  async listBankAccounts({ nUserId, nPerPage = 500, nPage = 1, Active = true }) {
    return new Promise((resolve, reject) => {
      axios.get(`${URL}${ClientId}/users/${nUserId}/bankaccounts??Per_Page=${nPerPage}&Page=${nPage}&Active=${Active}`, {
        headers: {
          Authorization: token
        }
      }).then(response => {
        resolve(response.data)
      }).catch(error => {
        if (error.response) reject(JSON.stringify(error.response.data))
        else reject(errorMessage)
      })
    })
  }
}

module.exports = new Mangopay()

const publicEmailClients = ['0815.ru', '0815.ru0clickemail.com', '0815.ry', '0815.su', '0845.ru', '0clickemail.com', '0-mail.com', '0wnd.net', '0wnd.org', '10mail.com', '10mail.org', '10minut.com.pl', '10minutemail.cf', '10minutemail.co.za', '10minutemail.com', '10minutemail.de', '10minutemail.ga', '10minutemail.gq', '10minutemail.ml', '10minutemail.net', '10minutesmail.com', '10x9.com', '123-m.com', '126.com', '12houremail.com', '12minutemail.com', '12minutemail.net', '139.com', '163.com', '1ce.us', '1chuan.com', '1fsdfdsfsdf.tk', '1mail.ml', '1pad.de', '1zhuan.com', '20mail.it', '20minutemail.com', '21cn.com', '24hourmail.com', '2fdgdfgdfgdf.tk', '2prong.com', '30minutemail.com', '33mail.com', '3d-painting.com', '3mail.ga', '3trtretgfrfe.tk', '420blaze.it', '4gfdsgfdgfd.tk', '4mail.cf', '4mail.ga', '4warding.com', '4warding.net', '4warding.org', '5ghgfhfghfgh.tk', '5mail.cf', '5mail.ga', '60minutemail.com', '675hosting.com', '675hosting.net', '675hosting.org', '6hjgjhgkilkj.tk', '6ip.us', '6mail.cf', '6mail.ga', '6mail.ml', '6paq.com', '6url.com', '75hosting.com', '75hosting.net', '75hosting.org', '7days-printing.com', '7mail.ga', '7mail.ml', '7tags.com', '8127ep.com', '8chan.co', '8mail.cf', '8mail.ga', '8mail.ml', '99experts.com', '9mail.cf', '9ox.net', 'a.mailcker.com', 'a.vztc.com', 'a45.in', 'a-bc.net', 'abyssmail.com', 'afrobacon.com', 'ag.us.to', 'agedmail.com', 'ajaxapp.net', 'akapost.com', 'akerd.com', 'aktiefmail.nl', 'alivance.com', 'amail4.me', 'ama-trade.de', 'ama-trans.de', 'amilegit.com', 'amiri.net', 'amiriindustries.com', 'anappthat.com', 'ano-mail.net', 'anonbox.net', 'anon-mail.de', 'anonmails.de', 'anonymail.dk', 'anonymbox.com', 'anonymousmail.org', 'anonymousspeech.com', 'antichef.com', 'antichef.net', 'antireg.com', 'antireg.ru', 'antispam.de', 'antispam24.de', 'antispammail.de', 'armyspy.com', 'artman-conception.com', 'asdasd.nl', 'asdasd.ru', 'atvclub.msk.ru', 'auti.st', 'avpa.nl', 'azmeil.tk', 'b2cmail.de', 'baxomale.ht.cx', 'beddly.com', 'beefmilk.com', 'big1.us', 'bigprofessor.so', 'bigstring.com', 'binkmail.com', 'bio-muesli.info', 'bio-muesli.net', 'blackmarket.to', 'bladesmail.net', 'bloatbox.com', 'blogmyway.org', 'blogos.com', 'bluebottle.com', 'bobmail.info', 'bodhi.lawlita.com', 'bofthew.com', 'bootybay.de', 'boun.cr', 'bouncr.com', 'boxformail.in', 'boximail.com', 'br.mintemail.com', 'brainonfire.net', 'breakthru.com', 'brefmail.com', 'brennendesreich.de', 'broadbandninja.com', 'bsnow.net', 'bspamfree.org', 'bu.mintemail.com', 'buffemail.com', 'bugmenever.com', 'bugmenot.com', 'bumpymail.com', 'bund.us', 'bundes-li.ga', 'burnthespam.info', 'burstmail.info', 'buymoreplays.com', 'buyusedlibrarybooks.org', 'byom.de', 'c2.hu', 'cachedot.net', 'cam4you.cc', 'card.zp.ua', 'casualdx.com', 'cc.liamria', 'cek.pm', 'cellurl.com', 'centermail.com', 'centermail.net', 'chammy.info', 'cheatmail.de', 'childsavetrust.org', 'chogmail.com', 'choicemail1.com', 'chong-mail.com', 'chong-mail.net', 'chong-mail.org','cliptik.net', 'clixser.com', 'clrmail.com', 'cmail.com', 'cmail.net', 'cmail.org', 'cock.li', 'coieo.com', 'coldemail.info', 'consumerriot.com', 'cool.fr.nf', 'correo.blogos.net', 'cosmorph.com', 'courriel.fr.nf', 'courrieltemporaire.com', 'crapmail.org', 'crazymailing.com', 'cubiclink.com', 'cumallover.me', 'curryworld.de', 'cust.in', 'cuvox.de', 'd3p.dk', 'dacoolest.com', 'datasoma.com','dandikmail.com', 'dayrep.com', 'dbunker.com', 'dcemail.com', 'deadaddress.com', 'deadchildren.org', 'deadfake.cf', 'deadfake.ga', 'deadfake.ml', 'deadfake.tk', 'deadspam.com', 'deagot.com', 'dealja.com', 'delikkt.de', 'despam.it', 'despammed.com', 'devnullmail.com', 'dfgh.net', 'dharmatel.net', 'dicksinhisan.us', 'dicksinmyan.us', 'digitalsanctuary.com', 'dingbone.com', 'discard.cf', 'discard.email', 'discard.ga', 'discard.gq', 'discard.ml', 'discard.tk', 'discardmail.com', 'discardmail.de', 'disposable.cf', 'disposable.ga', 'disposable.ml', 'disposableaddress.com', 'disposable-email.ml', 'disposableemailaddresses.com', 'disposableinbox.com', 'dispose.it', 'disposeamail.com', 'disposemail.com', 'dispostable.com', 'divermail.com', 'dm.w3internet.co.uk', 'dm.w3internet.co.ukexample.com', 'docmail.com', 'dodgeit.com', 'dodgit.com', 'dodgit.org', 'doiea.com', 'domozmail.com', 'donemail.ru', 'dontreg.com', 'dontsendmespam.de', 'dotman.de', 'dotmsg.com', 'drdrb.com', 'drdrb.net', 'dropcake.de', 'droplister.com', 'dropmail.me', 'dudmail.com', 'dumpandjunk.com', 'dump-email.info', 'dumpmail.de', 'dumpyemail.com', 'duskmail.com', 'e4ward.com', 'easytrashmail.com', 'edv.to', 'ee1.pl', 'ee2.pl', 'eelmail.com', 'einmalmail.de', 'einrot.com', 'einrot.de', 'eintagsmail.de', 'e-mail.com', 'email.net', 'e-mail.org', 'email60.com', 'emailage.cf', 'emailage.ga', 'emailage.gq', 'emailage.ml', 'emailage.tk', 'emaildienst.de', 'email-fake.cf', 'email-fake.ga', 'email-fake.gq', 'email-fake.ml', 'email-fake.tk', 'emailgo.de', 'emailias.com', 'emailigo.de', 'emailinfive.com', 'emaillime.com', 'emailmiser.com', 'emails.ga', 'emailsensei.com', 'emailspam.cf', 'emailspam.ga', 'emailspam.gq', 'emailspam.ml', 'emailspam.tk', 'emailtemporanea.com', 'emailtemporanea.net', 'emailtemporar.ro', 'emailtemporario.com.br', 'emailthe.net', 'emailtmp.com', 'emailto.de', 'emailwarden.com', 'emailx.at.hm', 'emailxfer.com', 'emailz.cf', 'emailz.ga', 'emailz.gq', 'emailz.ml', 'emeil.in', 'emeil.ir', 'emkei.cf', 'emkei.ga', 'emkei.gq', 'emkei.ml', 'emkei.tk', 'emz.net', 'enterto.com', 'ephemail.net', 'e-postkasten.com', 'e-postkasten.de', 'e-postkasten.eu', 'e-postkasten.info', 'ero-tube.org', 'etranquil.com', 'etranquil.net', 'etranquil.org', 'evopo.com', 'example.com', 'explodemail.com', 'express.net.ua', 'eyepaste.com', 'facebook-email.cf', 'facebook-email.ga', 'facebook-email.ml', 'facebookmail.gq', 'facebookmail.ml', 'faecesmail.me', 'fakedemail.com', 'fakeinbox.cf', 'fakeinbox.com', 'fakeinbox.ga', 'fakeinbox.ml', 'fakeinbox.tk', 'fakeinformation.com', 'fake-mail.cf', 'fakemail.fr', 'fake-mail.ga', 'fake-mail.ml', 'fakemailgenerator.com', 'fakemailz.com', 'fammix.com', 'fansworldwide.de', 'fantasymail.de', 'fastacura.com', 'fastchevy.com', 'fastchrysler.com', 'fastermail.com', 'fastkawasaki.com', 'fastmail.fm', 'fastmazda.com', 'fastmitsubishi.com', 'fastnissan.com', 'fastsubaru.com', 'fastsuzuki.com', 'fasttoyota.com', 'fastyamaha.com', 'fatflap.com', 'fdfdsfds.com', 'fightallspam.com', 'film-blog.biz', 'filzmail.com', 'fivemail.de', 'fixmail.tk', 'fizmail.com', 'fleckens.hu', 'flurred.com', 'flyspam.com', 'fly-ts.de', 'footard.com', 'forgetmail.com', 'fornow.eu', 'fr33mail.info', 'frapmail.com', 'freecoolemail.com', 'free-email.cf', 'free-email.ga', 'freeletter.me', 'freemail.ms', 'freemails.cf', 'freemails.ga', 'freemails.ml', 'freundin.ru', 'friendlymail.co.uk', 'front14.org', 'fuckingduh.com', 'fuckmail.me', 'fudgerub.com', 'fux0ringduh.com', 'fyii.de', 'garbagemail.org', 'garliclife.com', 'garrifulio.mailexpire.com', 'gawab.com', 'gehensiemirnichtaufdensack.de', 'gelitik.in', 'geschent.biz', 'geroev.net','get1mail.com', 'get2mail.fr', 'getairmail.cf', 'getairmail.com', 'getairmail.ga', 'getairmail.gq', 'getairmail.ml', 'getairmail.tk', 'get-mail.cf', 'get-mail.ga', 'get-mail.ml', 'get-mail.tk', 'getmails.eu', 'getonemail.com', 'getonemail.net', 'ghosttexter.de', 'giantmail.de', 'girlsundertheinfluence.com', 'gishpuppy.com', 'gmal.com', 'gmial.com', 'gmx.com', 'goat.si', 'goemailgo.com', 'gomail.in', 'gorillaswithdirtyarmpits.com', 'gotmail.com', 'gotmail.net', 'gotmail.org', 'gotti.otherinbox.com', 'gowikibooks.com', 'gowikicampus.com', 'gowikicars.com', 'gowikifilms.com', 'gowikigames.com', 'gowikimusic.com', 'gowikinetwork.com', 'gowikitravel.com', 'gowikitv.com', 'grandmamail.com', 'grandmasmail.com', 'great-host.in', 'greensloth.com', 'grr.la', 'gsrv.co.uk', 'guerillamail.biz', 'guerillamail.com', 'guerillamail.net', 'guerillamail.org', 'guerillamailblock.com', 'guerrillamail.biz', 'guerrillamail.com', 'guerrillamail.de', 'guerrillamail.info', 'guerrillamail.net', 'guerrillamail.org', 'guerrillamailblock.com', 'gustr.com', 'h.mintemail.com', 'h8s.org', 'hacccc.com', 'haltospam.com', 'harakirimail.com', 'hartbot.de', 'hatespam.org', 'hat-geld.de', 'herp.in', 'hidemail.de', 'hidzz.com', 'hmamail.com', 'hochsitze.com', 'hooohush.ai', 'hopemail.biz', 'horsefucker.org', 'hotmai.com', 'hot-mail.cf', 'hot-mail.ga', 'hot-mail.gq', 'hot-mail.ml', 'hot-mail.tk', 'hotmial.com', 'hotpop.com', 'huajiachem.cn', 'hulapla.de', 'humaility.com', 'hush.ai', 'hush.com', 'hushmail.com', 'hushmail.me', 'i2pmail.org', 'ieatspam.eu', 'ieatspam.info', 'ieh-mail.de', 'ignoremail.com', 'ihateyoualot.info', 'iheartspam.org', 'ikbenspamvrij.nl', 'imails.info', 'imgof.com', 'imgv.de', 'imstations.com', 'inbax.tk', 'inbox.si', 'inbox2.info', 'inboxalias.com', 'inboxclean.com', 'inboxclean.org', 'inboxdesign.me', 'inboxed.im', 'inboxed.pw', 'inboxstore.me', 'incognitomail.com', 'incognitomail.net', 'incognitomail.org', 'infocom.zp.ua', 'insorg-mail.info', 'instantemailaddress.com', 'instant-mail.de', 'iozak.com', 'ip6.li', 'ipoo.org', 'irish2me.com', 'iroid.com', 'is.af', 'iwantmyname.com', 'iwi.net', 'jetable.com', 'jetable.fr.nf', 'jetable.net', 'jetable.org', 'jnxjn.com', 'jourrapide.com', 'jsrsolutions.com', 'junk.to', 'junk1e.com', 'junkmail.ga', 'junkmail.gq', 'k2-herbal-incenses.com', 'kasmail.com', 'kaspop.com', 'keepmymail.com', 'khtyler.com','killmail.com', 'killmail.net', 'kir.ch.tc', 'klassmaster.com', 'klassmaster.net', 'klzlk.com', 'kmhow.com', 'kostenlosemailadresse.de', 'koszmail.pl', 'kulturbetrieb.info', 'kurzepost.de', 'l33r.eu', 'lackmail.net', 'lagify.com','lags.us', 'landmail.co', 'lastmail.co', 'lavabit.com', 'lawlita.com', 'letthemeatspam.com', 'lhsdv.com', 'lifebyfood.com', 'link2mail.net', 'linuxmail.so', 'litedrop.com', 'llogin.ru', 'loadby.us', 'login-email.cf', 'login-email.ga', 'login-email.ml', 'login-email.tk', 'lol.com', 'lol.ovpn.to', 'lolfreak.net', 'lookugly.com', 'lopl.co.cc', 'lortemail.dk', 'losemymail.com', 'lovebitco.in', 'lovemeleaveme.com', 'loves.dicksinhisan.us', 'loves.dicksinmyan.us', 'lr7.us', 'lr78.com', 'lroid.com', 'luckymail.org', 'lukop.dk', 'luv2.us', 'm21.cc', 'm4ilweb.info', 'ma1l.bij.pl', 'maboard.com', 'mac.hush.com', 'mail.by', 'mail.me', 'mail.mezimages.net', 'mail.ru', 'mail.zp.ua', 'mail114.net', 'mail1a.de', 'mail21.cc', 'mail2rss.org', 'mail2world.com', 'mail333.com', 'mail4trash.com', 'mailbidon.com', 'mailbiz.biz', 'mailblocks.com', 'mailbucket.org', 'mailcat.biz', 'mailcatch.com', 'mailde.de', 'mailde.info', 'maildrop.cc', 'maildrop.cf', 'maildrop.ga', 'maildrop.gq', 'maildrop.ml', 'maildu.de', 'maileater.com', 'mailed.in', 'maileimer.de', 'mailexpire.com', 'mailfa.tk', 'mail-filter.com', 'mailforspam.com', 'mailfree.ga', 'mailfree.gq', 'mailfree.ml', 'mailfreeonline.com', 'mailguard.me', 'mailhazard.com', 'mailhazard.us', 'mailhz.me', 'mailimate.com', 'mailin8r.com', 'mailinater.com', 'mailinator.com', 'mailinator.gq', 'mailinator.net', 'mailinator.org', 'mailinator.us', 'mailinator2.com', 'mailincubator.com', 'mailismagic.com', 'mailita.tk', 'mailjunk.cf', 'mailjunk.ga', 'mailjunk.gq', 'mailjunk.ml', 'mailjunk.tk', 'mailme.gq', 'mailme.ir', 'mailme.lv', 'mailme24.com', 'mailmetrash.com', 'mailmoat.com', 'mailms.com', 'mailnator.com', 'mailnesia.com', 'mailnull.com', 'mailorg.org', 'mailpick.biz', 'mailquack.com', 'mailrock.biz', 'mailsac.com', 'mailscrap.com', 'mailseal.de', 'mailshell.com', 'mailsiphon.com', 'mailslapping.com', 'mailslite.com', 'mailtemp.info', 'mail-temporaire.fr', 'mailtome.de', 'mailtothis.com', 'mailtrash.net', 'mailtv.net', 'mailtv.tv', 'mailwithyou.com', 'mailzilla.com', 'mailzilla.org', 'makemetheking.com', 'malahov.de', 'manifestgenerator.com', 'manybrain.com', 'mbx.cc', 'mega.zik.dj', 'meinspamschutz.de', 'meltmail.com', 'messagebeamer.de', 'mezimages.net', 'mierdamail.com', 'migmail.pl', 'migumail.com', 'ministry-of-silly-walks.de', 'mintemail.com', 'misterpinball.de', 'mjukglass.nu', 'mmmmail.com', 'moakt.com', 'mobi.web.id', 'mobileninja.co.uk', 'moburl.com', 'moncourrier.fr.nf', 'monemail.fr.nf', 'monmail.fr.nf', 'monumentmail.com', 'ms9.mailslite.com', 'msa.minsmail.com', 'msb.minsmail.com', 'msg.mailslite.com', 'mt2009.com', 'mt2014.com', 'mt2015.com', 'muchomail.com', 'mx0.wwwnew.eu', 'my10minutemail.com', 'mycard.net.ua', 'mycleaninbox.net', 'myemailboxy.com', 'mymail-in.net', 'mynetstore.de', 'mypacks.net', 'mypartyclip.de', 'myphantomemail.com', 'mysamp.de', 'myspaceinc.com', 'myspaceinc.net', 'myspaceinc.org', 'myspacepimpedup.com', 'myspamless.com', 'mytempemail.com', 'mytempmail.com', 'mythrashmail.net', 'mytrashmail.com', 'nabuma.com', 'nando1.com','national.shitposting.agency', 'naver.com', 'neomailbox.com', 'nepwk.com', 'nervmich.net', 'nervtmich.net', 'netmails.com', 'netmails.net', 'netzidiot.de', 'neverbox.com', 'nevermail.de', 'nice-4u.com', 'nigge.rs', 'nincsmail.hu', 'nmail.cf', 'nnh.com', 'noblepioneer.com', 'nobugmail.com', 'nobulk.com', 'nobuma.com', 'noclickemail.com', 'nogmailspam.info', 'nomail.pw', 'nomail.xl.cx', 'nomail2me.com', 'nomorespamemails.com', 'nonspam.eu', 'nonspammer.de', 'noref.in', 'nospam.wins.com.br', 'no-spam.ws', 'nospam.ze.tc', 'nospam4.us', 'nospamfor.us', 'nospammail.net', 'nospamthanks.info', 'notmailinator.com', 'notsharingmy.info', 'nowhere.org', 'nowmymail.com', 'ntlhelp.net', 'nullbox.info', 'nurfuerspam.de', 'nus.edu.sg', 'nwldx.com', 'o2.co.uk', 'o2.pl', 'objectmail.com', 'obobbo.com', 'odaymail.com', 'odnorazovoe.ru', 'ohaaa.de', 'omail.pro', 'oneoffemail.com', 'oneoffmail.com', 'onewaymail.com', 'onlatedotcom.info', 'online.ms', 'oopi.org', 'opayq.com', 'ordinaryamerican.net', 'otherinbox.com', 'ourklips.com', 'outlawspam.com', 'ovpn.to', 'owlpic.com', 'pancakemail.com', 'paplease.com', 'pcusers.otherinbox.com', 'pepbot.com', 'pfui.ru', 'phentermine-mortgages-texas-holdem.biz', 'pimpedupmyspace.com', 'pjjkp.com', 'plexolan.de', 'poczta.onet.pl', 'politikerclub.de', 'poofy.org', 'pookmail.com', 'postonline.me', 'powered.name', 'privacy.net', 'privatdemail.net', 'privy-mail.com', 'privymail.de', 'privy-mail.de', 'providier.com','proxymail.eu', 'prtnx.com', 'prtz.eu', 'punkass.com', 'put2.net', 'putthisinyourspamdatabase.com', 'pwrby.com', 'qasti.com', 'qisdo.com', 'qisoa.com', 'qoika.com', 'qq.com', 'quickinbox.com', 'quickmail.nl', 'rcpt.at', 'rcs.gaggle.net', 'reallymymail.com', 'realtyalerts.ca', 'receiveee.com', 'recode.me', 'recursor.net', 'recyclemail.dk', 'redchan.it', 'regbypass.com', 'regbypass.comsafe-mail.net', 'rejectmail.com', 'reliable-mail.com', 'remail.cf', 'remail.ga', 'rhyta.com', 'rklips.com', 'rmqkr.net', 'royal.net', 'rppkn.com', 'rtrtr.com', 's0ny.net', 'safe-mail.net', 'safersignup.de', 'safetymail.info', 'safetypost.de', 'sandelf.de', 'saynotospams.com', 'scatmail.com', 'schafmail.de', 'schmeissweg.tk', 'schrott-email.de', 'secmail.pw', 'secretemail.de', 'secure-mail.biz', 'secure-mail.cc', 'selfdestructingmail.com', 'selfdestructingmail.org', 'sendspamhere.com', 'senseless-entertainment.com', 'server.ms', 'services391.com', 'sharklasers.com', 'shayzam.net','shieldedmail.com', 'shieldemail.com', 'shiftmail.com', 'shitmail.me', 'shitmail.org', 'shitware.nl', 'shmeriously.com', 'shortmail.net', 'shut.name', 'shut.ws', 'sibmail.com', 'sify.com', 'sina.cn', 'sina.com', 'sinnlos-mail.de', 'siteposter.net', 'skeefmail.com', 'sky-ts.de', 'slapsfromlastnight.com', 'slaskpost.se', 'slave-auctions.net', 'slopsbox.com', 'slushmail.com', 'smaakt.naar.gravel', 'smapfree24.com', 'smapfree24.de', 'smapfree24.eu', 'smapfree24.info', 'smapfree24.org', 'smashmail.de', 'smellfear.com', 'snakemail.com', 'sneakemail.com', 'sneakmail.de', 'snkmail.com', 'sofimail.com', 'sofortmail.de', 'sofort-mail.de', 'sogetthis.com', 'sohu.com', 'solvemail.info', 'soodomail.com', 'soodonims.com', 'spam.la', 'spam.su', 'spam4.me', 'spamail.de', 'spamarrest.com', 'spamavert.com', 'spam-be-gone.com', 'spambob.com', 'spambob.net', 'spambob.org', 'spambog.com', 'spambog.de', 'spambog.net', 'spambog.ru', 'spambooger.com', 'spambox.info', 'spambox.irishspringrealty.com', 'spambox.org', 'spambox.us', 'spamcannon.com', 'spamcannon.net', 'spamcero.com', 'spamcon.org', 'spamcorptastic.com', 'spamcowboy.com', 'spamcowboy.net', 'spamcowboy.org', 'spamday.com', 'spamdecoy.net', 'spamex.com', 'spamfighter.cf', 'spamfighter.ga', 'spamfighter.gq', 'spamfighter.ml', 'spamfighter.tk', 'spamfree.eu', 'spamfree24.com', 'spamfree24.de', 'spamfree24.eu', 'spamfree24.info', 'spamfree24.net', 'spamfree24.org', 'spamgoes.in', 'spamgourmet.com', 'spamgourmet.net', 'spamgourmet.org', 'spamherelots.com', 'spamhereplease.com', 'spamhole.com', 'spamify.com', 'spaminator.de', 'spamkill.info', 'spaml.com', 'spaml.de', 'spammotel.com', 'spamobox.com', 'spamoff.de', 'spamsalad.in', 'spamslicer.com', 'spamspot.com', 'spamstack.net', 'spamthis.co.uk', 'spamthisplease.com', 'spamtrail.com', 'spamtroll.net', 'speed.1s.fr', 'spoofmail.de', 'squizzy.de', 'sry.li', 'ssoia.com', 'startkeys.com', 'stinkefinger.net', 'stop-my-spam.cf', 'stop-my-spam.com', 'stop-my-spam.ga', 'stop-my-spam.ml', 'stop-my-spam.tk', 'stuffmail.de', 'suioe.com', 'super-auswahl.de', 'supergreatmail.com', 'supermailer.jp', 'superplatyna.com', 'superrito.com', 'superstachel.de', 'suremail.info', 'sweetxxx.de', 'tafmail.com', 'tagyourself.com', 'talkinator.com', 'tapchicuoihoi.com', 'techemail.com', 'techgroup.me', 'teewars.org', 'teleworm.com', 'teleworm.us', 'temp.emeraldwebmail.com', 'tempail.com', 'tempalias.com', 'tempemail.biz', 'tempemail.co.za', 'tempemail.com', 'tempe-mail.com', 'tempemail.net', 'tempimbox.com', 'tempinbox.co.uk', 'tempinbox.com', 'tempmail.eu', 'tempmail.it', 'temp-mail.org', 'temp-mail.ru', 'tempmail2.com', 'tempmaildemo.com', 'tempmailer.com', 'tempmailer.de', 'tempomail.fr', 'temporarily.de', 'temporarioemail.com.br', 'temporaryemail.net', 'temporaryemail.us', 'temporaryforwarding.com', 'temporaryinbox.com', 'temporarymailaddress.com', 'tempthe.net', 'tempymail.com', 'tfwno.gf', 'thanksnospam.info', 'thankyou2010.com', 'thc.st', 'thecloudindex.com', 'thelimestones.com', 'thisisnotmyrealemail.com', 'thismail.net', 'thrma.com', 'throam.com', 'throwawayemailaddress.com', 'throwawaymail.com', 'tijdelijkmailadres.nl', 'tilien.com', 'tittbit.in', 'tizi.com', 'tmail.com', 'tmailinator.com', 'toiea.com', 'tokem.co', 'toomail.biz', 'topcoolemail.com', 'topfreeemail.com', 'topranklist.de', 'tormail.net', 'tormail.org', 'tradermail.info', 'trash2009.com', 'trash2010.com', 'trash2011.com', 'trash-amil.com', 'trashcanmail.com', 'trashdevil.com', 'trashdevil.de', 'trashemail.de', 'trashinbox.com', 'trashmail.at', 'trash-mail.at', 'trash-mail.cf', 'trashmail.com', 'trash-mail.com', 'trashmail.de', 'trash-mail.de', 'trash-mail.ga', 'trash-mail.gq', 'trashmail.me', 'trash-mail.ml', 'trashmail.net', 'trashmail.org', 'trash-mail.tk', 'trashmail.ws', 'trashmailer.com', 'trashymail.com', 'trashymail.net', 'trayna.com', 'trbvm.com', 'trialmail.de', 'trickmail.net', 'trillianpro.com', 'tryalert.com', 'turual.com', 'twinmail.de', 'tyldd.com', 'ubismail.net', 'uggsrock.com', 'umail.net', 'upliftnow.com', 'uplipht.com', 'uroid.com', 'us.af', 'uyhip.com', 'valemail.net', 'venompen.com', 'verticalscope.com', 'veryrealemail.com', 'veryrealmail.com', 'vidchart.com', 'viditag.com', 'viewcastmedia.com', 'viewcastmedia.net', 'viewcastmedia.org', 'vipmail.name', 'vipmail.pw', 'viralplays.com', 'vistomail.com', 'vomoto.com', 'vpn.st', 'vsimcard.com', 'vubby.com', 'vztc.com', 'walala.org', 'walkmail.net', 'wants.dicksinhisan.us', 'wants.dicksinmyan.us', 'wasteland.rfc822.org', 'watchfull.net', 'watch-harry-potter.com', 'webemail.me', 'webm4il.info', 'webuser.in', 'wegwerfadresse.de', 'wegwerfemail.com', 'wegwerfemail.de', 'wegwerf-email.de', 'weg-werf-email.de', 'wegwerfemail.net', 'wegwerf-email.net', 'wegwerfemail.org', 'wegwerf-email-addressen.de', 'wegwerfemailadresse.com', 'wegwerf-email-adressen.de', 'wegwerf-emails.de', 'wegwerfmail.de', 'wegwerfmail.info', 'wegwerfmail.net', 'wegwerfmail.org', 'wegwerpmailadres.nl', 'wegwrfmail.de', 'wegwrfmail.net', 'wegwrfmail.org', 'wetrainbayarea.com', 'wetrainbayarea.org', 'wh4f.org', 'whatiaas.com', 'whatpaas.com', 'whatsaas.com', 'whopy.com', 'whyspam.me', 'wickmail.net', 'wilemail.com', 'willhackforfood.biz', 'willselfdestruct.com', 'winemaven.info', 'wmail.cf', 'wolfsmail.tk', 'writeme.us', 'wronghead.com', 'wuzup.net', 'wuzupmail.net', 'www.e4ward.com', 'www.gishpuppy.com', 'www.mailinator.com', 'wwwnew.eu', 'x.ip6.li', 'xagloo.co', 'xagloo.com', 'xemaps.com', 'xents.com', 'xmail.com', 'xmaily.com', 'xoxox.cc', 'xoxy.net', 'xxtreamcam.com', 'xyzfree.net', 'yandex.com', 'yanet.me', 'yapped.net', 'yeah.net', 'yep.it', 'yogamaven.com', 'yomail.info', 'yopmail.com', 'yopmail.fr', 'yopmail.gq', 'yopmail.net', 'youmail.ga', 'youmailr.com', 'yourdomain.com', 'you-spam.com', 'ypmail.webarnak.fr.eu.org', 'yuurok.com', 'yxzx.net', 'z1p.biz', 'za.com', 'zdfpost.net','zebins.com', 'zebins.eu', 'zehnminuten.de', 'zehnminutenmail.de', 'zetmail.com', 'zippymail.info', 'zoaxe.com', 'zoemail.com', 'zoemail.net', 'zoemail.org', 'zomg.info']

const countries = [{
  "name": "Afghanistan",
  "dial_code": "+93",
  "code": "AF"
},
{
  "name": "Aland Islands",
  "dial_code": "+358",
  "code": "AX"
},
{
  "name": "Albania",
  "dial_code": "+355",
  "code": "AL"
},
{
  "name": "Algeria",
  "dial_code": "+213",
  "code": "DZ"
},
{
  "name": "AmericanSamoa",
  "dial_code": "+1684",
  "code": "AS"
},
{
  "name": "Andorra",
  "dial_code": "+376",
  "code": "AD"
},
{
  "name": "Angola",
  "dial_code": "+244",
  "code": "AO"
},
{
  "name": "Anguilla",
  "dial_code": "+1264",
  "code": "AI"
},
{
  "name": "Antarctica",
  "dial_code": "+672",
  "code": "AQ"
},
{
  "name": "Antigua and Barbuda",
  "dial_code": "+1268",
  "code": "AG"
},
{
  "name": "Argentina",
  "dial_code": "+54",
  "code": "AR"
},
{
  "name": "Armenia",
  "dial_code": "+374",
  "code": "AM"
},
{
  "name": "Aruba",
  "dial_code": "+297",
  "code": "AW"
},
{
  "name": "Australia",
  "dial_code": "+61",
  "code": "AU"
},
{
  "name": "Austria",
  "dial_code": "+43",
  "code": "AT"
},
{
  "name": "Azerbaijan",
  "dial_code": "+994",
  "code": "AZ"
},
{
  "name": "Bahamas",
  "dial_code": "+1242",
  "code": "BS"
},
{
  "name": "Bahrain",
  "dial_code": "+973",
  "code": "BH"
},
{
  "name": "Bangladesh",
  "dial_code": "+880",
  "code": "BD"
},
{
  "name": "Barbados",
  "dial_code": "+1246",
  "code": "BB"
},
{
  "name": "Belarus",
  "dial_code": "+375",
  "code": "BY"
},
{
  "name": "Belgium",
  "dial_code": "+32",
  "code": "BE"
},
{
  "name": "Belize",
  "dial_code": "+501",
  "code": "BZ"
},
{
  "name": "Benin",
  "dial_code": "+229",
  "code": "BJ"
},
{
  "name": "Bermuda",
  "dial_code": "+1441",
  "code": "BM"
},
{
  "name": "Bhutan",
  "dial_code": "+975",
  "code": "BT"
},
{
  "name": "Bolivia, Plurinational State of",
  "dial_code": "+591",
  "code": "BO"
},
{
  "name": "Bosnia and Herzegovina",
  "dial_code": "+387",
  "code": "BA"
},
{
  "name": "Botswana",
  "dial_code": "+267",
  "code": "BW"
},
{
  "name": "Brazil",
  "dial_code": "+55",
  "code": "BR"
},
{
  "name": "British Indian Ocean Territory",
  "dial_code": "+246",
  "code": "IO"
},
{
  "name": "Brunei Darussalam",
  "dial_code": "+673",
  "code": "BN"
},
{
  "name": "Bulgaria",
  "dial_code": "+359",
  "code": "BG"
},
{
  "name": "Burkina Faso",
  "dial_code": "+226",
  "code": "BF"
},
{
  "name": "Burundi",
  "dial_code": "+257",
  "code": "BI"
},
{
  "name": "Cambodia",
  "dial_code": "+855",
  "code": "KH"
},
{
  "name": "Cameroon",
  "dial_code": "+237",
  "code": "CM"
},
{
  "name": "Canada",
  "dial_code": "+1",
  "code": "CA"
},
{
  "name": "Cape Verde",
  "dial_code": "+238",
  "code": "CV"
},
{
  "name": "Cayman Islands",
  "dial_code": "+ 345",
  "code": "KY"
},
{
  "name": "Central African Republic",
  "dial_code": "+236",
  "code": "CF"
},
{
  "name": "Chad",
  "dial_code": "+235",
  "code": "TD"
},
{
  "name": "Chile",
  "dial_code": "+56",
  "code": "CL"
},
{
  "name": "China",
  "dial_code": "+86",
  "code": "CN"
},
{
  "name": "Christmas Island",
  "dial_code": "+61",
  "code": "CX"
},
{
  "name": "Cocos (Keeling) Islands",
  "dial_code": "+61",
  "code": "CC"
},
{
  "name": "Colombia",
  "dial_code": "+57",
  "code": "CO"
},
{
  "name": "Comoros",
  "dial_code": "+269",
  "code": "KM"
},
{
  "name": "Congo",
  "dial_code": "+242",
  "code": "CG"
},
{
  "name": "Congo, The Democratic Republic of the Congo",
  "dial_code": "+243",
  "code": "CD"
},
{
  "name": "Cook Islands",
  "dial_code": "+682",
  "code": "CK"
},
{
  "name": "Costa Rica",
  "dial_code": "+506",
  "code": "CR"
},
{
  "name": "Cote d'Ivoire",
  "dial_code": "+225",
  "code": "CI"
},
{
  "name": "Croatia",
  "dial_code": "+385",
  "code": "HR"
},
{
  "name": "Cuba",
  "dial_code": "+53",
  "code": "CU"
},
{
  "name": "Cyprus",
  "dial_code": "+357",
  "code": "CY"
},
{
  "name": "Czech Republic",
  "dial_code": "+420",
  "code": "CZ"
},
{
  "name": "Denmark",
  "dial_code": "+45",
  "code": "DK"
},
{
  "name": "Djibouti",
  "dial_code": "+253",
  "code": "DJ"
},
{
  "name": "Dominica",
  "dial_code": "+1767",
  "code": "DM"
},
{
  "name": "Dominican Republic",
  "dial_code": "+1849",
  "code": "DO"
},
{
  "name": "Ecuador",
  "dial_code": "+593",
  "code": "EC"
},
{
  "name": "Egypt",
  "dial_code": "+20",
  "code": "EG"
},
{
  "name": "El Salvador",
  "dial_code": "+503",
  "code": "SV"
},
{
  "name": "Equatorial Guinea",
  "dial_code": "+240",
  "code": "GQ"
},
{
  "name": "Eritrea",
  "dial_code": "+291",
  "code": "ER"
},
{
  "name": "Estonia",
  "dial_code": "+372",
  "code": "EE"
},
{
  "name": "Ethiopia",
  "dial_code": "+251",
  "code": "ET"
},
{
  "name": "Falkland Islands (Malvinas)",
  "dial_code": "+500",
  "code": "FK"
},
{
  "name": "Faroe Islands",
  "dial_code": "+298",
  "code": "FO"
},
{
  "name": "Fiji",
  "dial_code": "+679",
  "code": "FJ"
},
{
  "name": "Finland",
  "dial_code": "+358",
  "code": "FI"
},
{
  "name": "France",
  "dial_code": "+33",
  "code": "FR"
},
{
  "name": "French Guiana",
  "dial_code": "+594",
  "code": "GF"
},
{
  "name": "French Polynesia",
  "dial_code": "+689",
  "code": "PF"
},
{
  "name": "Gabon",
  "dial_code": "+241",
  "code": "GA"
},
{
  "name": "Gambia",
  "dial_code": "+220",
  "code": "GM"
},
{
  "name": "Georgia",
  "dial_code": "+995",
  "code": "GE"
},
{
  "name": "Germany",
  "dial_code": "+49",
  "code": "DE"
},
{
  "name": "Ghana",
  "dial_code": "+233",
  "code": "GH"
},
{
  "name": "Gibraltar",
  "dial_code": "+350",
  "code": "GI"
},
{
  "name": "Greece",
  "dial_code": "+30",
  "code": "GR"
},
{
  "name": "Greenland",
  "dial_code": "+299",
  "code": "GL"
},
{
  "name": "Grenada",
  "dial_code": "+1473",
  "code": "GD"
},
{
  "name": "Guadeloupe",
  "dial_code": "+590",
  "code": "GP"
},
{
  "name": "Guam",
  "dial_code": "+1671",
  "code": "GU"
},
{
  "name": "Guatemala",
  "dial_code": "+502",
  "code": "GT"
},
{
  "name": "Guernsey",
  "dial_code": "+44",
  "code": "GG"
},
{
  "name": "Guinea",
  "dial_code": "+224",
  "code": "GN"
},
{
  "name": "Guinea-Bissau",
  "dial_code": "+245",
  "code": "GW"
},
{
  "name": "Guyana",
  "dial_code": "+595",
  "code": "GY"
},
{
  "name": "Haiti",
  "dial_code": "+509",
  "code": "HT"
},
{
  "name": "Holy See (Vatican City State)",
  "dial_code": "+379",
  "code": "VA"
},
{
  "name": "Honduras",
  "dial_code": "+504",
  "code": "HN"
},
{
  "name": "Hong Kong",
  "dial_code": "+852",
  "code": "HK"
},
{
  "name": "Hungary",
  "dial_code": "+36",
  "code": "HU"
},
{
  "name": "Iceland",
  "dial_code": "+354",
  "code": "IS"
},
{
  "name": "India",
  "dial_code": "+91",
  "code": "IN"
},
{
  "name": "Indonesia",
  "dial_code": "+62",
  "code": "ID"
},
{
  "name": "Iran, Islamic Republic of Persian Gulf",
  "dial_code": "+98",
  "code": "IR"
},
{
  "name": "Iraq",
  "dial_code": "+964",
  "code": "IQ"
},
{
  "name": "Ireland",
  "dial_code": "+353",
  "code": "IE"
},
{
  "name": "Isle of Man",
  "dial_code": "+44",
  "code": "IM"
},
{
  "name": "Israel",
  "dial_code": "+972",
  "code": "IL"
},
{
  "name": "Italy",
  "dial_code": "+39",
  "code": "IT"
},
{
  "name": "Jamaica",
  "dial_code": "+1876",
  "code": "JM"
},
{
  "name": "Japan",
  "dial_code": "+81",
  "code": "JP"
},
{
  "name": "Jersey",
  "dial_code": "+44",
  "code": "JE"
},
{
  "name": "Jordan",
  "dial_code": "+962",
  "code": "JO"
},
{
  "name": "Kazakhstan",
  "dial_code": "+77",
  "code": "KZ"
},
{
  "name": "Kenya",
  "dial_code": "+254",
  "code": "KE"
},
{
  "name": "Kiribati",
  "dial_code": "+686",
  "code": "KI"
},
{
  "name": "Korea, Democratic People's Republic of Korea",
  "dial_code": "+850",
  "code": "KP"
},
{
  "name": "Korea, Republic of South Korea",
  "dial_code": "+82",
  "code": "KR"
},
{
  "name": "Kuwait",
  "dial_code": "+965",
  "code": "KW"
},
{
  "name": "Kyrgyzstan",
  "dial_code": "+996",
  "code": "KG"
},
{
  "name": "Laos",
  "dial_code": "+856",
  "code": "LA"
},
{
  "name": "Latvia",
  "dial_code": "+371",
  "code": "LV"
},
{
  "name": "Lebanon",
  "dial_code": "+961",
  "code": "LB"
},
{
  "name": "Lesotho",
  "dial_code": "+266",
  "code": "LS"
},
{
  "name": "Liberia",
  "dial_code": "+231",
  "code": "LR"
},
{
  "name": "Libyan Arab Jamahiriya",
  "dial_code": "+218",
  "code": "LY"
},
{
  "name": "Liechtenstein",
  "dial_code": "+423",
  "code": "LI"
},
{
  "name": "Lithuania",
  "dial_code": "+370",
  "code": "LT"
},
{
  "name": "Luxembourg",
  "dial_code": "+352",
  "code": "LU"
},
{
  "name": "Macao",
  "dial_code": "+853",
  "code": "MO"
},
{
  "name": "Macedonia",
  "dial_code": "+389",
  "code": "MK"
},
{
  "name": "Madagascar",
  "dial_code": "+261",
  "code": "MG"
},
{
  "name": "Malawi",
  "dial_code": "+265",
  "code": "MW"
},
{
  "name": "Malaysia",
  "dial_code": "+60",
  "code": "MY"
},
{
  "name": "Maldives",
  "dial_code": "+960",
  "code": "MV"
},
{
  "name": "Mali",
  "dial_code": "+223",
  "code": "ML"
},
{
  "name": "Malta",
  "dial_code": "+356",
  "code": "MT"
},
{
  "name": "Marshall Islands",
  "dial_code": "+692",
  "code": "MH"
},
{
  "name": "Martinique",
  "dial_code": "+596",
  "code": "MQ"
},
{
  "name": "Mauritania",
  "dial_code": "+222",
  "code": "MR"
},
{
  "name": "Mauritius",
  "dial_code": "+230",
  "code": "MU"
},
{
  "name": "Mayotte",
  "dial_code": "+262",
  "code": "YT"
},
{
  "name": "Mexico",
  "dial_code": "+52",
  "code": "MX"
},
{
  "name": "Micronesia, Federated States of Micronesia",
  "dial_code": "+691",
  "code": "FM"
},
{
  "name": "Moldova",
  "dial_code": "+373",
  "code": "MD"
},
{
  "name": "Monaco",
  "dial_code": "+377",
  "code": "MC"
},
{
  "name": "Mongolia",
  "dial_code": "+976",
  "code": "MN"
},
{
  "name": "Montenegro",
  "dial_code": "+382",
  "code": "ME"
},
{
  "name": "Montserrat",
  "dial_code": "+1664",
  "code": "MS"
},
{
  "name": "Morocco",
  "dial_code": "+212",
  "code": "MA"
},
{
  "name": "Mozambique",
  "dial_code": "+258",
  "code": "MZ"
},
{
  "name": "Myanmar",
  "dial_code": "+95",
  "code": "MM"
},
{
  "name": "Namibia",
  "dial_code": "+264",
  "code": "NA"
},
{
  "name": "Nauru",
  "dial_code": "+674",
  "code": "NR"
},
{
  "name": "Nepal",
  "dial_code": "+977",
  "code": "NP"
},
{
  "name": "Netherlands",
  "dial_code": "+31",
  "code": "NL"
},
{
  "name": "Netherlands Antilles",
  "dial_code": "+599",
  "code": "AN"
},
{
  "name": "New Caledonia",
  "dial_code": "+687",
  "code": "NC"
},
{
  "name": "New Zealand",
  "dial_code": "+64",
  "code": "NZ"
},
{
  "name": "Nicaragua",
  "dial_code": "+505",
  "code": "NI"
},
{
  "name": "Niger",
  "dial_code": "+227",
  "code": "NE"
},
{
  "name": "Nigeria",
  "dial_code": "+234",
  "code": "NG"
},
{
  "name": "Niue",
  "dial_code": "+683",
  "code": "NU"
},
{
  "name": "Norfolk Island",
  "dial_code": "+672",
  "code": "NF"
},
{
  "name": "Northern Mariana Islands",
  "dial_code": "+1670",
  "code": "MP"
},
{
  "name": "Norway",
  "dial_code": "+47",
  "code": "NO"
},
{
  "name": "Oman",
  "dial_code": "+968",
  "code": "OM"
},
{
  "name": "Pakistan",
  "dial_code": "+92",
  "code": "PK"
},
{
  "name": "Palau",
  "dial_code": "+680",
  "code": "PW"
},
{
  "name": "Palestinian Territory, Occupied",
  "dial_code": "+970",
  "code": "PS"
},
{
  "name": "Panama",
  "dial_code": "+507",
  "code": "PA"
},
{
  "name": "Papua New Guinea",
  "dial_code": "+675",
  "code": "PG"
},
{
  "name": "Paraguay",
  "dial_code": "+595",
  "code": "PY"
},
{
  "name": "Peru",
  "dial_code": "+51",
  "code": "PE"
},
{
  "name": "Philippines",
  "dial_code": "+63",
  "code": "PH"
},
{
  "name": "Pitcairn",
  "dial_code": "+872",
  "code": "PN"
},
{
  "name": "Poland",
  "dial_code": "+48",
  "code": "PL"
},
{
  "name": "Portugal",
  "dial_code": "+351",
  "code": "PT"
},
{
  "name": "Puerto Rico",
  "dial_code": "+1939",
  "code": "PR"
},
{
  "name": "Qatar",
  "dial_code": "+974",
  "code": "QA"
},
{
  "name": "Romania",
  "dial_code": "+40",
  "code": "RO"
},
{
  "name": "Russia",
  "dial_code": "+7",
  "code": "RU"
},
{
  "name": "Rwanda",
  "dial_code": "+250",
  "code": "RW"
},
{
  "name": "Reunion",
  "dial_code": "+262",
  "code": "RE"
},
{
  "name": "Saint Barthelemy",
  "dial_code": "+590",
  "code": "BL"
},
{
  "name": "Saint Helena, Ascension and Tristan Da Cunha",
  "dial_code": "+290",
  "code": "SH"
},
{
  "name": "Saint Kitts and Nevis",
  "dial_code": "+1869",
  "code": "KN"
},
{
  "name": "Saint Lucia",
  "dial_code": "+1758",
  "code": "LC"
},
{
  "name": "Saint Martin",
  "dial_code": "+590",
  "code": "MF"
},
{
  "name": "Saint Pierre and Miquelon",
  "dial_code": "+508",
  "code": "PM"
},
{
  "name": "Saint Vincent and the Grenadines",
  "dial_code": "+1784",
  "code": "VC"
},
{
  "name": "Samoa",
  "dial_code": "+685",
  "code": "WS"
},
{
  "name": "San Marino",
  "dial_code": "+378",
  "code": "SM"
},
{
  "name": "Sao Tome and Principe",
  "dial_code": "+239",
  "code": "ST"
},
{
  "name": "Saudi Arabia",
  "dial_code": "+966",
  "code": "SA"
},
{
  "name": "Senegal",
  "dial_code": "+221",
  "code": "SN"
},
{
  "name": "Serbia",
  "dial_code": "+381",
  "code": "RS"
},
{
  "name": "Seychelles",
  "dial_code": "+248",
  "code": "SC"
},
{
  "name": "Sierra Leone",
  "dial_code": "+232",
  "code": "SL"
},
{
  "name": "Singapore",
  "dial_code": "+65",
  "code": "SG"
},
{
  "name": "Slovakia",
  "dial_code": "+421",
  "code": "SK"
},
{
  "name": "Slovenia",
  "dial_code": "+386",
  "code": "SI"
},
{
  "name": "Solomon Islands",
  "dial_code": "+677",
  "code": "SB"
},
{
  "name": "Somalia",
  "dial_code": "+252",
  "code": "SO"
},
{
  "name": "South Africa",
  "dial_code": "+27",
  "code": "ZA"
},
{
  "name": "South Sudan",
  "dial_code": "+211",
  "code": "SS"
},
{
  "name": "South Georgia and the South Sandwich Islands",
  "dial_code": "+500",
  "code": "GS"
},
{
  "name": "Spain",
  "dial_code": "+34",
  "code": "ES"
},
{
  "name": "Sri Lanka",
  "dial_code": "+94",
  "code": "LK"
},
{
  "name": "Sudan",
  "dial_code": "+249",
  "code": "SD"
},
{
  "name": "Suriname",
  "dial_code": "+597",
  "code": "SR"
},
{
  "name": "Svalbard and Jan Mayen",
  "dial_code": "+47",
  "code": "SJ"
},
{
  "name": "Swaziland",
  "dial_code": "+268",
  "code": "SZ"
},
{
  "name": "Sweden",
  "dial_code": "+46",
  "code": "SE"
},
{
  "name": "Switzerland",
  "dial_code": "+41",
  "code": "CH"
},
{
  "name": "Syrian Arab Republic",
  "dial_code": "+963",
  "code": "SY"
},
{
  "name": "Taiwan",
  "dial_code": "+886",
  "code": "TW"
},
{
  "name": "Tajikistan",
  "dial_code": "+992",
  "code": "TJ"
},
{
  "name": "Tanzania, United Republic of Tanzania",
  "dial_code": "+255",
  "code": "TZ"
},
{
  "name": "Thailand",
  "dial_code": "+66",
  "code": "TH"
},
{
  "name": "Timor-Leste",
  "dial_code": "+670",
  "code": "TL"
},
{
  "name": "Togo",
  "dial_code": "+228",
  "code": "TG"
},
{
  "name": "Tokelau",
  "dial_code": "+690",
  "code": "TK"
},
{
  "name": "Tonga",
  "dial_code": "+676",
  "code": "TO"
},
{
  "name": "Trinidad and Tobago",
  "dial_code": "+1868",
  "code": "TT"
},
{
  "name": "Tunisia",
  "dial_code": "+216",
  "code": "TN"
},
{
  "name": "Turkey",
  "dial_code": "+90",
  "code": "TR"
},
{
  "name": "Turkmenistan",
  "dial_code": "+993",
  "code": "TM"
},
{
  "name": "Turks and Caicos Islands",
  "dial_code": "+1649",
  "code": "TC"
},
{
  "name": "Tuvalu",
  "dial_code": "+688",
  "code": "TV"
},
{
  "name": "Uganda",
  "dial_code": "+256",
  "code": "UG"
},
{
  "name": "Ukraine",
  "dial_code": "+380",
  "code": "UA"
},
{
  "name": "United Arab Emirates",
  "dial_code": "+971",
  "code": "AE"
},
{
  "name": "United Kingdom",
  "dial_code": "+44",
  "code": "GB"
},
{
  "name": "United States",
  "dial_code": "+1",
  "code": "US"
},
{
  "name": "Uruguay",
  "dial_code": "+598",
  "code": "UY"
},
{
  "name": "Uzbekistan",
  "dial_code": "+998",
  "code": "UZ"
},
{
  "name": "Vanuatu",
  "dial_code": "+678",
  "code": "VU"
},
{
  "name": "Venezuela, Bolivarian Republic of Venezuela",
  "dial_code": "+58",
  "code": "VE"
},
{
  "name": "Vietnam",
  "dial_code": "+84",
  "code": "VN"
},
{
  "name": "Virgin Islands, British",
  "dial_code": "+1284",
  "code": "VG"
},
{
  "name": "Virgin Islands, U.S.",
  "dial_code": "+1340",
  "code": "VI"
},
{
  "name": "Wallis and Futuna",
  "dial_code": "+681",
  "code": "WF"
},
{
  "name": "Yemen",
  "dial_code": "+967",
  "code": "YE"
},
{
  "name": "Zambia",
  "dial_code": "+260",
  "code": "ZM"
},
{
  "name": "Zimbabwe",
  "dial_code": "+263",
  "code": "ZW"
}]



module.exports = {
  publicEmailClients,
  countries
}
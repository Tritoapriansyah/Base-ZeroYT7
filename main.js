const {
    WAConnection,
    MessageType,
    Presence,
    Mimetype,
    GroupSettingChange
} = require('@adiwajshing/baileys')
const fs = require('fs')
const moment = require('moment-timezone')
const { wait, banner, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, start, info, success, close } = require('./lib/functions')
const { color } = require('./lib/color')
const _welkom = JSON.parse(fs.readFileSync('./database/welcome.json'))

require('./zeroyt7.js')
nocache('./zeroyt7.js', module => console.log(`${module} telah di update!`))

const starts = async (zeroyt7 = new WAConnection()) => {
    zeroyt7.logger.level = 'warn'
    zeroyt7.version = [2, 2123, 8]
    zeroyt7.browserDescription = ['Lolita','Opera','3.0']
    await sleep(10000)
    zeroyt7.on('qr', qr => {
        qrcode.generate(qr, { small: true })
        console.log(color('[','white'), color('!','red'), color(']','white'), color(' SCAN QR CODE SEGERA...!'))
    })
    fs.existsSync('./inisesi.json') && zeroyt7.loadAuthInfo('./inisesi.json')
    
    zeroyt7.on('credentials-updated', () => {
        console.log(color('|TRM|'), color('credentials updated!', 'cyan'))
        })
     
      await zeroyt.connect({ timeoutMs: 30 * 1000 });
  fs.writeFileSync("./inisesi.json",JSON.stringify(zeroyt7.base64EncodedAuthInfo(), null, "\t"));
  console.log(banner)
      const sendButImage = async (from, context, fotext, img, but) => {
    gam = img
    jadinya = await zeroyt7.prepareMessage(from, gam, MessageType.image)
    buttonMessagesI = {
      imageMessage: jadinya.message.imageMessage,
      contentText: context,
      footerText: fotext,
      buttons: but,
      headerType: 4
    }
    zeroyt7.sendMessage(from, buttonMessagesI, MessageType.buttonsMessage)
  }

    fs.existsSync('./zeroyt7.json') && zeroyt7.loadAuthInfo('./zeroyt7.json')
    zeroyt7.on('connecting', () => {
        start('2', 'PROSES MENYAMBUNG...')
    })
    zeroyt7.on('open', () => {
        success('2', 'BOT SUDAH AKTIF!, SILAHKAN GUNAKAN SUBS XRUTZ BOT!')
    })
    await zeroyt7.connect({timeoutMs: 30*1000})
        fs.writeFileSync('./zeroyt7.json', JSON.stringify(zeroyt7.base64EncodedAuthInfo(), null, '\t'))

    zeroyt7.on('chat-update', async (message) => {
        require('./zeroyt7.js')(zeroyt7, message, _welkom)
    })
zeroyt7.on("group-participants-update", async (anu) => {

    const isWelkom = _welkom.includes(anu.jid)
    try {
      groupMet = await zeroyt7.groupMetadata(anu.jid)
      groupMembers = groupMet.participants
      groupAdmins = getGroupAdmins(groupMembers)
      mem = anu.participants[0]

      console.log(anu)
      try {
        pp_user = await zeroyt7.getProfilePicture(mem)
      } catch (e) {
        pp_user = "https://telegra.ph/file/c9dfa715c26518201f478.jpg"
      }
      try {
        pp_grup = await zeroyt7.getProfilePicture(anu.jid)
      } catch (e) {
        pp_grup =
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60"
      }
      if (anu.action == "add" && mem.includes(zeroyt7.user.jid)) {
        zeroyt7.sendMessage(anu.jid, "Hallo...! *Terima kasih telah mengundang Lolita Bot!*\nSaya akan membantu jika perlu!\nUntuk memulai Bot, *Silahkan ketik #menu* Ya!", "conversation")
      }
      if (!isWelkom) return
      if (anu.action == "add" && !mem.includes(zeroyt7.user.jid)) {
        mdata = await zeroyt7.groupMetadata(anu.jid)
        memeg = mdata.participants.length
        num = anu.participants[0]
        let v = zeroyt7.contacts[num] || { notify: num.replace(/@.+/, "") }
        anu_user = v.vname || v.notify || num.split("@")[0]
        time_wel = moment.tz("Asia/Jakarta").format("HH:mm")
        wel = `*Hallo* @${anu_user} \n*Welcome In Grup :* ${mdata.subject} \n*Semoga betah ya!* Saya Lolita Bot`
        buff = await getBuffer(
          `http://hadi-api.herokuapp.com/api/card/welcome?nama=${anu_user}&descriminator=${groupMembers.length
          }&memcount=${memeg}&gcname=${encodeURI(
            mdata.subject
          )}&pp=${pp_user}&bg=https://i.ibb.co/Jqn8mQ8/20211013-212323.jpg`
        )

        but = [
          { buttonId: 'add', buttonText: { displayText: 'SELAMAT DATANG' }, type: 1 }
        ]
        sendButImage(mdata.id, wel, "© Trito", buff, but)
      }
      if (!isWelkom) return
      if (anu.action == "remove" && !mem.includes(zeroyt7.user.jid)) {
        mdata = await zeroyt7.groupMetadata(anu.jid)
        num = anu.participants[0]
        let w = zeroyt7.contacts[num] || { notify: num.replace(/@.+/, "") }
        anu_user = w.vname || w.notify || num.split("@")[0]
        time_wel = moment.tz("Asia/Jakarta").format("HH:mm")
        memeg = mdata.participants.length
        out = `Mari Kita Doakan Bersama-Sama Buat Yang Keluar \n*Sayonara :*@${anu_user} Semoga Tenang Di *Alam Perwibuan 🗿*`
        buff = await getBuffer(
          `http://hadi-api.herokuapp.com/api/card/goodbye?nama=${anu_user}&descriminator=${groupMembers.length
          }&memcount=${memeg}&gcname=${encodeURI(
            mdata.subject
          )}&pp=${pp_user}&bg=https://i.ibb.co/Jqn8mQ8/20211013-212323.jpg`
        )

        but = [
          { buttonId: 'remove', buttonText: { displayText: 'Selamat Tinggal' }, type: 1 }
        ]
        sendButImage(mdata.id, out, "© Lolita Bot buff, but)
      }
      if (anu.action == "promote") {
        const mdata = await zeroyt7.groupMetadata(anu.jid)
        anu_user = zeroyt7.contacts[mem]
        num = anu.participants[0]
        try {
          ppimg = await zeroyt7.getProfilePicture(
            `${anu.participants[0].split("@")[0]}@c.us`
          )
        } catch {
          ppimg =
            "https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg"
        }
        let buff = await getBuffer(ppimg)
        teks = `@${num.split("@")[0]} *Telah dipromote*, Selamat 🔥`
        zeroyt7.sendMessage(mdata.id, teks, MessageType.text)
      }

      if (anu.action == "demote") {
        anu_user = zeroyt7.contacts[mem]
        num = anu.participants[0]
        const mdata = await zeroyt7.groupMetadata(anu.jid)
        try {
          ppimg = await zeroyt7.getProfilePicture(
            `${anu.participants[0].split("@")[0]}@c.us`
          )
        } catch {
          ppimg =
            "https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg"
        }

        let buff = await getBuffer(
          `https://gatauajg.yogipw.repl.co/api/demote?name=${anu_user.notify}&msg=selamat%20menjadi%20admin&mem=5&picurl=${ppimg}&bgurl=https://cdn.discordapp.com/attachments/819995259261288475/835055559941292032/style.jpg`
        )
        teks = `@${num.split("@")[0]} *Telah didemote*, Kasian 🗿`
        zeroyt7.sendMessage(mdata.id, teks, MessageType.text)
      }
    } catch (e) {
      console.log("Error : %s", color(e, "red"))
    }

  })
}

/**
 * Uncache if there is file change
 * @param {string} module Module name or path
 * @param {function} cb <optional> 
 */
function nocache(module, cb = () => { }) {
    console.log('Module', `'${module}'`, 'sekarang sedang diawasi untuk perubahan')
    fs.watchFile(require.resolve(module), async () => {
        await uncache(require.resolve(module))
        cb(module)
    })
}

/**
 * Uncache a module
 * @param {string} module Module name or path
 */
function uncache(module = '.') {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(module)]
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}

starts()

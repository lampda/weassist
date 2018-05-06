const fs = require('fs')
const {
    Wechaty
} = require('wechaty')


const listContacts(contact) {
    const contactList = await bot.Contact.findAll()
    console.log('Contact number: ' + contactList.length)
}


const makeFile = function(filename, data) {
    fs.writeFile('./data/'+filename, data, {
        'flag': 'a',
        'encoding': 'utf8'
    }, function(err) {
        if (err) {
            console.log('file not saved. ' + err)
            return
        } else {
            console.log('file saved.')
        }
    })
}

// make user profile
const createUserProfile = function(uid) {
    //
    console.log('normal user.')
}


const createMediaProfile = function(mid) {
    //
    console.log('media user.')
}


const saveChatMsg = function(dt_iso, message, filename) {
    /* body... */
    console.log(`${dt_iso} Message from ${message.from().name()}[${message.from().id}]: ${message}`)
    makeFile(filename, `${dt_iso} ${message.from().name()}[${message.from().id}]: ${message}\n`)

}


const saveSelfMsg = function(dt_iso, message, filename) {
    console.log(`${dt_iso} Message from ${message.from().name()}[${message.from().id}]: ${message}`)
    makeFile(filename, `${dt_iso} ${message.from().name()}[${message.from().id}]: ${message}\n`)
}


const saveRoomMsg = function(dt_iso, message, filename) {
    const room = message.room()
    console.log(`${dt_iso} Message from ${message.from().name()}[${message.from().id}]: ${message}`)
    makeFile(filename, `${dt_iso} ${message.from().name()}[${message.from().id}]: ${message}\n`)
}


const bot = Wechaty.instance()

bot
    .on('error', e => console.log('Bot error: %s', e))
    .on('scan', (url, code) => console.log(`Scan QR Code to login: ${code}\n${url}`))
    .on('login', user => console.log(`User ${user} logined`))
    .on('friend', async function(contact, request) {
        var dt = new Date()
        var dt_iso = dt.toISOString()
        if (request) {
            console.log(`Friend requested from user ${contact.name()} [${contact.id()}] with ${request.hello}`)
            const resp = await request.accept()
            if (resp) {
                console.log(`${dt_iso} Request from ${contact.name()} [${contact.id()}] is accept succesfully!`)
                makeFile('main.log', `${dt_iso} ${contact.name()} [${contact.id()}]\n`)
            } else {
                console.log(`${dt_iso} Request from ${contact.name()} [${contact.id()}] failed to accept!`)
            }
        } else { // 2. confirm friend ship
            console.log(`${dt_iso} new friendship confirmed with ${contact.name()} [${contact.id()}]`)
        }
        listContacts(contact)
    })
    .on('message', message => {
        var dt = new Date()
        var dt_iso = dt.toISOString()
            // var userType = message.

        var room = m.room()

        if (room) {
            console.log('${dt_iso} room message received.')
            saveRoomMsg(dt_iso, message, 'main_room_' + room + '.log')
        } else if (message.self()) {
            console.log('${dt_iso} self message received.')
            saveSelfMsg(dt_iso, message, 'main.log')
        } else {
            console.log('${dt_iso} chat one2one message received.')
            saveChatMsg(dt_iso, message, 'main_self.log')
        }

        console.log(`${dt_iso} ${message.from().name()}[${message.from().id}]: ${message}\n`)
    })
    .on('room-join', (room, inviteeList, inviter) => {
        var dt = new Date()
        var dt_iso = dt.toISOString()
        const nameList = inviteeList.map(c => c.name()).join(',')
        console.log(`${dt_iso} Room ${room.topic()} got new member ${nameList}, invited by ${inviter}`)
    })
    .on('room-leave', (room, leaverList) => {
        var dt = new Date()
        var dt_iso = dt.toISOString()
        const nameList = leaverList.map(c => c.name()).join(',')
        console.log(`${dt_iso} Room ${room.topic()} lost member ${nameList}`)
    })
    .on('room-topic', (room, topic, oldTopic, changer) => {
        var dt = new Date()
        var dt_iso = dt.toISOString()
        console.log(`${dt_iso} Room ${room.topic()} topic changed from ${oldTopic} to ${topic} by ${changer.name()}`)
    })

.start()
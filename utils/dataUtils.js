export function createTimestamp(){
    const now = new Date();
    const formattedDate = now.toISOString().slice(0, -5) + ".0Z";

    return formattedDate
}

export function generateUniqueId(length = 36) {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }

    return result;
}

export function createMessage(message){
    let newMessage = message;

    const id = generateUniqueId();
    const timeStamp = createTimestamp();

    newMessage = newMessage.replace('uniqueId', id).replace('timeStamp', timeStamp);

    return newMessage;
}

export function addTrsId(message, id){
    let newMessage = message;
    newMessage = newMessage.replace('"trsID"', id);
    return newMessage
}
type usernameProp = {
    userName: string
}


export function Names({ userName }:usernameProp) {

    return userName?.charAt(0).toUpperCase()
}
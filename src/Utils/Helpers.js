const Helpers = {
    themeBg: '#131313',
    themeLight: '#222',
    themeColor: '#be9f48',
    themeTextColor: '#fff',
    RegularExpression: {
        emailCheck: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        lettersCheck: /^[a-zA-Z ]*$/,
        phoneCheck: /^[0-9-+()]*$/,
        numberCheck: /^[0-9]*$/,
        htmlTagRegex: /(<([^>]+)>)/ig,
        onlyNumber: /[0-9]/,
        smallLetter: /[a-z]/,
        capitalLetter: /[A-Z]/,
        specialCharacter: /[@#$\.%^&+=]/
    },
    AllUserData: [],
    LoginUserData: null
};

export default Helpers;
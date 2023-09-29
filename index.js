const axios = require('axios')

const global_header = {
    "authority": "sms-activate.org",
    "Origin": "https://sms-activate.org/",
    "Referer": "https://sms-activate.org/",
    "Sec-Ch-Ua": "\"Google Chrome\";v=\"117\", \"Not;A=Brand\";v=\"8\", \"Chromium\";v=\"117\"",
    "Sec-Ch-Ua-Mobile": "?0",
    "Sec-Ch-Ua-Platform": "\"Windows\"",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36"
}


var response_error = {
    'EARLY_CANCEL_DENIED': 'You can‘t cancel the number within the first 2 minutes',
    'ERROR_SQL': "sql-server error",
    "NO_ACTIVATION": "activation id does not exist",
    "BAD_SERVICE": "incorrect service name",
    "BAD_STATUS": "incorrect status",
    "BAD_KEY": "invalid API key",
    "BAD_ACTION": "incorrect action"
}

const getData = (url = '') => {
    return new Promise((resolve, reject) => {
        try {
            if (url.length <= 0) {
                resolve(false)
                return false
            }
            axios.get(url, global_header)
                .then(response => {
                    resolve(response.data)
                })
                .catch(err => {
                    resolve(false)
                })
        } catch (err) {
            resolve(false)
        }
    })
}

const sleep = (ms) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, ms);
    })
}


const buyNumber = ({ country = 151, service = 'dr', operator = 'any', apiKey = '', verification = false }) => {
    return new Promise(async (resolve, reject) => {
        var response = {
            status: false,
            data: 'There was an error taking the number.'
        }
        try {
            var numberFetch = await getData(`https://sms-activate.org/stubs/handler_api.php?api_key=${apiKey}&action=getNumberV2&service=${service}&operator=${operator}&ref=2715333&country=${country}&verification=${verification}`)
            if (numberFetch === false) {
                resolve(response)
                return false
            }
            if (numberFetch.activationId && String(numberFetch.activationId).length > 0) {
                response.status = true
            }
            response.data = numberFetch
            resolve(response)
        } catch (err) {
            resolve(response)
        }
    })
}

const getCode = ({ apiKey = '', activationId = '' }) => {
    return new Promise(async (resolve, reject) => {
        var response = {
            status: false,
            data: 'There was an error taking the number.'
        }
        try {
            var codeFetch = await getData(`https://api.sms-activate.org/stubs/handler_api.php?api_key=${apiKey}&action=getStatus&id=${activationId}`)
            if (codeFetch === false) {
                resolve(response)
                return false
            }
            if (codeFetch.indexOf('STATUS_OK') > -1) {
                response.status = true
                if (String(codeFetch).split(':')[1]) {
                    codeFetch = String(codeFetch).split(':')[1]
                }
            }
            response.data = codeFetch
            resolve(response)
        } catch (err) {
            resolve(response)
        }
    })
}


const waitForBuyNumber = ({ country = 151, service = 'dr', operator = 'any', apiKey = '', verification = false, timeOut = 120000 }) => {
    return new Promise(async (resolve, reject) => {
        var while_status = true
        var start_date = Date.now()
        var response_data = {
            status: false,
            data: 'No results were received.'
        }
        try {

            while (while_status) {
                var repeatBuy = await buyNumber({
                    country: country,
                    service: service,
                    operator: operator,
                    apiKey: apiKey,
                    verification: verification
                })

                if (repeatBuy.status == true) {
                    while_status = false
                    response_data.status = true
                    response_data.data = repeatBuy.data
                }

                if (timeOut != 0 && (Date.now() >= (start_date + timeOut))) {
                    while_status = false
                }
                if (while_status == true) {
                    await sleep(1000)
                }
            }

            resolve(response_data)
        } catch (err) {
            resolve(response_data)
        }
    })
}


const waitForCode = ({ apiKey = '', activationId = '', timeOut = 120000 }) => {
    return new Promise(async (resolve, reject) => {

        var while_status = true
        var start_date = Date.now()
        var response_data = {
            status: false,
            data: 'No results were received.'
        }
        try {
            while (while_status) {
                var repeatBuy = await getCode({
                    activationId: activationId,
                    apiKey: apiKey
                })
                if (repeatBuy.status == true) {
                    while_status = false
                    response_data.status = true
                    response_data.data = repeatBuy.data
                }

                if (timeOut != 0 && (Date.now() >= (start_date + timeOut))) {
                    while_status = false
                }
                if (while_status == true) {
                    await sleep(1000)
                }
            }

            resolve(response_data)
        } catch (err) {
            resolve(response_data)
        }
    })
}



const setStatusActivation = ({ apiKey = '', activationId = '', status = 8 }) => {
    return new Promise(async (resolve, reject) => {
        var response_data = {
            status: false,
            data: 'Operation failed. '
        }
        try {
            var setStatus = await getData(`https://api.sms-activate.org/stubs/handler_api.php?api_key=${apiKey}&action=setStatus&status=${status}&id=${activationId}`)
            if (setStatus === false) {
                resolve(response_data)
                return false
            }
            if (status == 8 && setStatus == 'ACCESS_CANCEL') {
                response_data.status = true
                response_data.data = setStatus
            } else if (status == 3 && setStatus == 'ACCESS_RETRY_GET') {
                response_data.status = true
                response_data.data = setStatus
            } else if (status == 6 && setStatus == 'ACCESS_ACTIVATION') {
                response_data.status = true
                response_data.data = setStatus
            } else if (status == 1 && setStatus == 'ACCESS_READY') {
                response_data.status = true
                response_data.data = setStatus
            }

            if (response_error[setStatus]) {
                response_data.data = setStatus + ' - ' + response_error[setStatus]
            }
            resolve(response_data)
        } catch (err) {
            resolve(response_data)
        }
    })
}

const getBallance = ({ apiKey = '' }) => {
    return new Promise(async (resolve, reject) => {
        var response_data = {
            status: false,
            data: 'There was an error processing the request. The service cannot be reached...'
        }
        try {
            var getBallanceData = await getData(`https://api.sms-activate.org/stubs/handler_api.php?api_key=${apiKey}&action=getBalance`)
            if (getBallanceData === false) {
                resolve(response_data)
                return false
            }
            if (getBallanceData.indexOf('ACCESS_BALANCE') > -1) {
                response_data.status = true
                response_data.data = getBallanceData.split(':')[1] ? Number(getBallanceData.split(':')[1]) : 0
            }
            if (response_error[getBallanceData]) {
                response_data.data = getBallanceData + ' - ' + response_error[getBallanceData]
            }
            resolve(response_data)
        } catch (err) {
            resolve(response_data)
        }
    })
}

module.exports = {
    getBallance,
    setStatusActivation,
    waitForCode,
    waitForBuyNumber,
    getCode,
    buyNumber
}
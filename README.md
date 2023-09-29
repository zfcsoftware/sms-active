# sms-active
This library provides the following features

- Sms active api allows you to get a number with the api and get the status of whether the verification code has arrived.
- If we don't have the type of number you want in stock, it waits until it arrives and returns the number information to you when you buy a number.
- You don't need to constantly check if you have received a verification code. It contains a function that checks the status until the verification code arrives and returns the code when it arrives.
- It allows you to cancel a number you have received, confirm that you have received the code, and receive another code for the same number for free.
- You can read your account balance.

```bash
npm i node-sms-active
```


### Buying a new number

```js
const smsActive = require("node-sms-active");

smsActive.buyNumber({
    country: 6, // See the bottom of the documentation for the country list.
    service: 'dr', // See the bottom of the documentation for the service list.
    operator: 'any',
    apiKey: '',
    verification: false
})
.then(response=>{
    console.log(response)
})
.catch(err=>{
    console.log(err)
})
```
**country:** The number of sms active in the country where the number will be received. To find the country you are looking for, see the country codes at the bottom of the page.

**service:** The sms active short code of the service to receive the number. To find the service you are looking for, see the service codes at the bottom of the page.

**operator:** You can use it if you want to get a number from a private operator in your country. It is not mandatory to send it. Default any

**apiKey:** https://sms-activate.org/en/api2 You can create a key by saying create api key from this link.

**verification:** Default false. Sending is not mandatory. If true, a number that supports the call will be received.


<details>
<summary>Sample Successful Response</summary>

```js
{
  status: true,
  data: {
    activationId: '1779177117',
    phoneNumber: '628973921615',
    activationCost: '4.50',
    countryCode: '6',
    canGetAnotherSms: true,
    activationTime: '2023-09-30 02:36:18',
    activationOperator: 'three'
  }
}
```

</details>


<details>
<summary>Sample Failed Response</summary>

```js
{ 
    status: false, 
    data: 'WRONG_COUNTRY' 
}
```

</details>
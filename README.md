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
.catch(error =>{
    console.log(error)
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



### Check if the Sms Code has arrived and receive it if so

```js
const smsActive = require("node-sms-active");

smsActive.getCode({
    activationId: '',
    apiKey: '',
})
.then(response=>{
    console.log(response)
})
.catch(error =>{
    console.log(error)
})
```

**activationId:**  When you buy the number, you need to send the value returned to you in json.

**apiKey:** https://sms-activate.org/en/api2 You can create a key by saying create api key from this link.

<details>
<summary>Sample Successful Response</summary>

```js
{ 
    status: true, 
    data: '396989' 
}
```
</details>


<details>
<summary>Sample Failed Response</summary>

```js
{ 
    status: false, 
    data: 'STATUS_WAIT_CODE' 
}
```
</details>


### Attempts to purchase until the number matching your requirements is in stock


```js
const smsActive = require("node-sms-active");

smsActive.waitForBuyNumber({
    country: 6, // See the bottom of the documentation for the country list.
    service: 'dr', // See the bottom of the documentation for the service list.
    operator: 'any',
    apiKey: '',
    verification: false,
    timeOut: 0
})
.then(response=>{
    console.log(response)
})
.catch(error =>{
    console.log(error)
})
```

**country:** The number of sms active in the country where the number will be received. To find the country you are looking for, see the country codes at the bottom of the page.

**service:** The sms active short code of the service to receive the number. To find the service you are looking for, see the service codes at the bottom of the page.

**operator:** You can use it if you want to get a number from a private operator in your country. It is not mandatory to send it. Default any

**apiKey:** https://sms-activate.org/en/api2 You can create a key by saying create api key from this link.

**verification:** Default false. Sending is not mandatory. If true, a number that supports the call will be received.

**timeOut:** 0 Wait indefinitely if sent. If sent in milliseconds, it will return the status when the time expires. 1 Second = 1000 Milliseconds

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


### Attempts purchase until sms confirmation code arrives


```js
const smsActive = require("node-sms-active");

smsActive.waitForCode({
    activationId: '',
    apiKey: '',
    timeOut: 0
})
.then(response=>{
    console.log(response)
})
.catch(error =>{
    console.log(error)
})
```

**activationId:**  When you buy the number, you need to send the value returned to you in json.

**apiKey:** https://sms-activate.org/en/api2 You can create a key by saying create api key from this link.

**timeOut:** 0 Wait indefinitely if sent. If sent in milliseconds, it will return the status when the time expires. 1 Second = 1000 Milliseconds

<details>
<summary>Sample Successful Response</summary>

```js
{ 
    status: true, 
    data: '396989' 
}
```
</details>


<details>
<summary>Sample Failed Response</summary>

```js
{ 
    status: false, 
    data: 'STATUS_WAIT_CODE' 
}
```
</details>


### Change the status of the order


```js
const smsActive = require("node-sms-active");

smsActive.setStatusActivation({
    activationId: '',
    apiKey: '',
    status: 8
})
.then(response=>{
    console.log(response)
})
.catch(error =>{
    console.log(error)
})
```

**activationId:**  When you buy the number, you need to send the value returned to you in json.

**apiKey:** https://sms-activate.org/en/api2 You can create a key by saying create api key from this link.

**status:** Can only take values 1, 3, 6, 8

1 inform about the readiness of the number (SMS sent to the number)

3 request another code (free)

6 complete activation *

8 inform that the number has been used and cancel the activation


<details>
<summary>Sample Successful Response</summary>

```js
{ 
    status: true, 
    data: 'ACCESS_CANCEL' 
}
```
</details>


<details>
<summary>Sample Failed Response</summary>

```js
{
  status: false,
  data: 'EARLY_CANCEL_DENIED - You can‘t cancel the number within the first 2 minutes'
}
```
</details>





### Get account balance


```js
const smsActive = require("node-sms-active");

smsActive.getBallance({
    apiKey: '',
})
.then(response=>{
    console.log(response)
})
.catch(error =>{
    console.log(error)
})
```

**apiKey:** https://sms-activate.org/en/api2 You can create a key by saying create api key from this link.

<details>
<summary>Sample Successful Response</summary>

```js
{ 
    status: true, 
    data: 498.28
}
```
</details>


<details>
<summary>Sample Failed Response</summary>

```js
{
  status: false,
  data: 'ERROR_SQL'
}
```
</details>



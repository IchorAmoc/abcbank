# **Assignment 1 Cloud Tech README**
#### Group Quokka
---

## Heroku link

[ABC Heroku app link CLICK ME](https://abcbankquokka.herokuapp.com/)

or copy paste this link: https://abcbankquokka.herokuapp.com/
---
## Github repo
[Github repo link CLICK ME](https://github.com/IchorAmoc/abcbank)

or copy paste this link: https://github.com/IchorAmoc/abcbank

### To set up local:
1. npm install
2. make a .env file in the outermost folder and write this:

```DATABASE_URL = mongodb://localhost/abcbank```

3. npm run devStart
4. go to http://localhost:3000/

---
## Marks

* **Client server design and validation –5 points**
    * Should be working as intended.

* **Database design –2 points**
    * Link to schema: [CLICK ME](./models/customer.js)
    * DB on MongoDB website:
    ![MongoDB database design](./MDB.PNG "Logo Title Text 1")

* **Database connection –2 points**
    * Mongoose / MongoDB should be 100% functional.

* **Client-server connection –2 points**
    * From our understandning, we believe we have done this.

* **At least 1 REST API(https://restfulapi.net/) should use(get, post, put, delete)-7 points**
    * Link to the file this is mainly in: [CLICK ME](./routes/customers.js).

* **At least 1 DB query should work –5 points**
    * Insert, delete, update etc. should be working as intended.
* **Deployed to Heroku server –2 points**
    * Done.
    * Again, [CLICK ME](https://abcbankquokka.herokuapp.com/) to go to the heroku app
* **Additional task –5 points**
    * A simple latency calculation is console logged. 
    * Morgan (package) -> Console logs end to end latency.
---
## Notes
* This is our understanding of the assignment.



const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const server = require("../../app");

chai.use(chaiHttp);

describe("Head page is testing", () => {
   it("GET METODI ORQALI SAHIFANI TEST QILDIK", (done) => {
      chai
         .request(server)
         .get('/')
         .end((err, res) => {
            res.should.have.status(200);
            done();
         });
   });
});
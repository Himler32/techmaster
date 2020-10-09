const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();
const server = require("../../app");

chai.use(chaiHttp);

describe("API MOVIESNI TEST QILAMIZ", () => {
   before((done)=>{
      chai.request(server)
      .post("/autentificate")
      .send({username: "xursand",  password: "426815"})
      .end((err, res)=>{
         token = res.body.token
         // console.log(token)
         done()
      });
   });

   describe('get movies', ()=>{
       it('Get metod orqali  movies ni tekshirdik', (done)=>{
        chai.request(server)
        .get('/api/movies')
        .set('x-access-token', token)
        .end((err, res)=>{
            res.should.have.status(200)
            res.body.should.be.a('array')    // MA'LUMOTLARNI QANDAY TURDA JONATISHINI YOZISH KERAK OBJECT OR ARRAY
            done()
        });
      });
   });

   describe("post method orqali movie yaratishni test qildik", () => {
      
      it("Post method orqali api/movies ga movie kirgazish", (done) => {
        const movie = {
          title: "Kitanic",
          category: "Romantic",
          country: "USA",
          year: "1997",
          director_id: "5f63880e3cf43d1dc093ca7f",
          imdb_score: 7,
        };
        
        chai
          .request(server)
          .post("/api/movies")
          .send(movie)
          .set("x-access-token", token)
          .end((err, res) => {
            res.should.have.be.a("object");
            res.body.should.have.property("title");
            res.body.should.have.property("category");                                          
            res.body.should.have.property("country");
            res.body.should.have.property("year");
            res.body.should.have.property("director_id");
            res.body.should.have.property("imdb_score");
            movieId = res.body._id
            done();
          });
      });
    });

    describe("Get metod orqali api movie korsatdik", () => {
      
      it("Get metod orqali api movie korsatdik", (done) => {
        chai
          .request(server)
          .get(`/api/movies/${movieId}`)
          .set("x-access-token", token)
          .end((err, res) => {
            res.should.have.be.a("object");
            res.body.should.have.property("title");
            res.body.should.have.property("category");                                          
            res.body.should.have.property("country");
            res.body.should.have.property("year");
            res.body.should.have.property("director_id");
            res.body.should.have.property("imdb_score");
            res.body.should.have.property("_id").eql(movieId);
            done();
          });
      });
    });

   
    describe("Put metoq orqali edit qildik", () => {
      
      it("Put metoq orqali edit qildik", (done) => {
        chai
          .request(server)
          .put(`/api/movies/${movieId}`)
          .set("x-access-token", token)
          .end((err, res) => {
            res.body.should.have.property("_id").eql(movieId);
            // res.should.have.be.a("object");
            // res.body.should.have.property("title");
            // res.body.should.have.property("category");                                          
            // res.body.should.have.property("country");
            // res.body.should.have.property("year");
            // res.body.should.have.property("director_id");
            // res.body.should.have.property("imdb_score");
            // res.body.should.have.property("_id").eql(movieId);git
            done();
          });
      });
    });
    describe("deleto orqali remove qildik", () => {
      
      it("deleto orqali remove qildik", (done) => {
        chai
          .request(server)
          .delete(`/api/movies/${movieId}`)
          .set("x-access-token", token)
          .end((err, res) => {
            res.should.have.be.a("object");
            res.body.should.have.property("title");
            res.body.should.have.property("category");                                          
            res.body.should.have.property("country");
            res.body.should.have.property("year");
            res.body.should.have.property("director_id");
            res.body.should.have.property("imdb_score");
            res.body.should.have.property("_id").eql(movieId);
            done();
          });
      });
    });
});


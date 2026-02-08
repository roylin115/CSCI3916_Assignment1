const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');

chai.use(chaiHttp);
chai.should();

describe('Echo API', () => {
  it('should echo plain text and preserve text/plain content-type', (done) => {
    chai
      .request(app)
      .post('/')
      .set('Content-Type', 'text/plain')
      .send('hello world')
      .end((err, res) => {
        res.should.have.status(200);
        res.text.should.equal('hello world');
        res.headers['content-type'].should.include('text/plain');
        done();
      });
  });

  it('should echo JSON and preserve application/json content-type', (done) => {
    const payload = { msg: 'hello', count: 3 };
    const jsonString = JSON.stringify(payload);

    chai
      .request(app)
      .post('/')
      .set('Content-Type', 'application/json')
      .send(jsonString)
      .end((err, res) => {
        res.should.have.status(200);
        res.text.should.equal(jsonString);
        res.headers['content-type'].should.include('application/json');
        done();
      });
  });

  it('should handle empty body and default to text/plain', (done) => {
    chai
      .request(app)
      .post('/')
      .end((err, res) => {
        res.should.have.status(200);
        res.text.should.equal('');
        res.headers['content-type'].should.include('text/plain');
        done();
      });
  });
});

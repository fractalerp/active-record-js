import { expect } from "chai";
import * as sinon from "sinon";
import { RelationalActiveRecord } from "../../relational/relational_active_record";
import { userOneData, userTwoData } from "../fixtures/user_data";
import { IUserTable, userTableSchema } from "../fixtures/user_table";

describe("RelationalActiveRecord", () => {
  const sandbox = sinon.createSandbox();
  let modelMock!: sinon.SinonStub<any[], any>;
  const relationalActiveRecord = new RelationalActiveRecord<IUserTable>("Table", userTableSchema);
  before(() => {
    modelMock = sandbox.stub();
    relationalActiveRecord.model.findOne = modelMock;
    relationalActiveRecord.model.findAll = modelMock;
    relationalActiveRecord.model.create = modelMock;
    relationalActiveRecord.model.update = modelMock;
    relationalActiveRecord.model.destroy = modelMock;
    // @ts-ignore
    relationalActiveRecord.model.sequelize?.query = modelMock;
  });

  it("should find one row", async () => {
    const findOneMock = modelMock.returns(Promise.resolve(userOneData));

    findOneMock.resolves(userOneData);

    const result = await relationalActiveRecord.findOne({});

    expect(result).to.deep.equal(userOneData);
    expect(modelMock.calledWith({})).to.be.true;
  });

  it("should find list of rows", async () => {
    const findMock = modelMock.returns(Promise.resolve([userOneData]));

    findMock.resolves([userOneData]);

    const result = await relationalActiveRecord.find({});

    expect(result.length).to.equal(1);
    expect(result[0]).to.deep.equal(userOneData);
    expect(findMock.calledWith({})).to.be.true;
  });

  it("should create a row", async () => {
    const createMock = modelMock.returns(Promise.resolve(userOneData));

    createMock.resolves(userOneData);

    const result = await relationalActiveRecord.create(userOneData);

    expect(result).to.deep.equal(userOneData);
  });

  it("should update a row", async () => {
    const updateMock = modelMock.returns(Promise.resolve(userTwoData));
    updateMock.resolves(userTwoData);

    const result = await relationalActiveRecord.update(userOneData._id, userTwoData);

    expect(result).to.deep.equal(userTwoData);
  });

  it("should delete a row", async () => {
    const deleteMock = modelMock.returns(Promise.resolve(undefined));

    deleteMock.resolves(undefined);
    // @ts-ignore
    const result = await relationalActiveRecord.delete(userOneData._id);

    expect(result).to.equal(undefined);
  });

  it("should submit a query for execution", async () => {
    const queryMock = modelMock.returns(Promise.resolve(userOneData));

    queryMock.resolves(userOneData);
    const result = await relationalActiveRecord.query("SELECT * FROM `users`");

    expect(result).to.equal(userOneData);
  });

  // Tear down
  afterEach(() => {
    sinon.restore();
    sandbox.restore();
  });
});

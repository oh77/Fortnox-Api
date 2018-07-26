const expect = require("chai").expect;
const should = require("chai").should;
const Chance = require("chance");
const chance = new Chance();

require("dotenv").load();
const FortnoxClient = require("../lib/index");

var mockpricelist;
var mockCustomer;
const fortnox = new FortnoxClient(
    process.env.CLIENT_SECRET,
    process.env.ACCESS_TOKEN
);
describe("FortnoxClient", () => {
    it("should get list of customers", async () => {
        const result = await fortnox.getCustomers(1, 2);
        expect(result.Customers).to.be.an("array");
    });

    it("should create a new customer", async () => {
        const customer = {
            Name: "Customer AB"
        };
        const result = await fortnox.createCustomer(customer);
        mockCustomer = result.Customer;
        expect(result.Customer).to.be.an("object");
    });

    it("should get a customer by id", async () => {
        const result = await fortnox.getCustomerById(
            mockCustomer.CustomerNumber
        );
        expect(result.Customer).to.be.an("object");
    });

    it("should delete a customer", async () => {
        const res = await fortnox.removeCustomer(mockCustomer.CustomerNumber);
        expect(res).to.be.empty;
    });

    it("should get list of articles", async () => {
        const result = await fortnox.getArticles();
        expect(result.Articles).to.be.an("array");
    });

    it("should get list of orders", async () => {
        const result = await fortnox.getOrders();
        expect(result.Orders).to.be.an("array");
    });

    it("should get list of pricelists", async () => {
        const result = await fortnox.getPriceLists();
        expect(result.PriceLists).to.be.an("array");
    });

    it("should create a new pricelist", async () => {
        const pricelist = {
            Code: chance.string({ length: 4, pool: "abcefghijklmonpqrstuv" }),
            Description: "Prislista AB",
            Comments: "En prislista för privatpersoner",
        };
        const result = await fortnox.createPriceList(pricelist);
        expect(result.PriceList).to.be.an("object");

        mockpricelist = result.PriceList;
    });

    it("should get a pricelist by id", async () => {
        const result = await fortnox.getPriceListById(mockpricelist.Code);
        expect(result.PriceList).to.be.an("object");
    });
});

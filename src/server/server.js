const app = require('express')()
var Airtable = require("airtable");
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/getSemiCircleProp', (req, res) => {

    var base = new Airtable({ apiKey: "keybDggjciUcG3Cb0" }).base(
        "appnQWCo3ZOOZMrrr"
    );
    let disability = 0;
    let military = 0;
    let mothertongue = 0;
    let recordTotalCount = 0;
    let recordLength = 0;
    let LGBTQIA = 0;
    let man = 0;
    let woman = 0;
    let notPrefer = 0;
    let agender = 0;
    let white = 0;
    let hispanicAndLatinx = 0;
    let eastAssian = 0;
    let balckAndAfricanDescent = 0;
    let southeastAssian = 0;
    let soutAssian = 0;
    let nativeAmerican = 0;

    base("Table 1")
        .select({
            view: "Grid view",
        })
        .eachPage(
            function page(records, fetchNextPage) {

                recordLength = Object.keys(records[0].fields).length;
                records.forEach(function (record) {
                    record.fields.disability == "yes" ? disability++ : "";
                    record.fields.military == "yes" ? military++ : "";
                    record.fields.mothertongue == "English" ? mothertongue++ : "";
                    record.fields.LGBTQIA == "yes" ? LGBTQIA++ : "";
                    record.fields.gender == "Man" ? man++ : record.fields.gender == "Woman" ? woman++ : record.fields.gender == "Agender" ? agender++ : notPrefer++;
                    record.fields.ethnicity == "White" ? white++ : record.fields.ethnicity == "Hispanic/Latinx" ? hispanicAndLatinx++ : record.fields.ethnicity == "East Assian" ? eastAssian++ :
                        record.fields.ethnicity == "Black/African descent" ? balckAndAfricanDescent++ : record.fields.ethnicity == "Southeast Asian" ? southeastAssian++ :
                            record.fields.ethnicity == "South Asian" ? soutAssian++ : nativeAmerican++
                    recordTotalCount++;
                });
                fetchNextPage();
            },
            function done(err) {
                if (err) {
                    console.error(err);
                    return res.json({ message: "Lütfen daha sonra tekrar deneyiniz." });
                }
                let recordKeyValue = [
                    ["disability", disability],
                    ["military", military],
                    ["mothertongue", mothertongue],
                    ["LGBTQIA", LGBTQIA]
                ]
                let genderType = [
                    { type: "Woman", value: woman },
                    { type: "Man", value: man },
                    { type: "Agender", value: agender },
                    { type: "Prefer not to answer", value: notPrefer },
                ]
                let ethnicityType = [
                    { type: "White", value: white },
                    { type: "Hispanic/Latinx", value: hispanicAndLatinx },
                    { type: "East Assian", value: eastAssian },
                    { type: "Black/African descent", value: balckAndAfricanDescent },
                    { type: "Southeast Asian", value: southeastAssian },
                    { type: "South Asian", value: soutAssian },
                    { type: "Native American", value: nativeAmerican },
                ]
                res.json({ "recordKeyValue": recordKeyValue, test: [["gander", genderType], ["ethnicity", ethnicityType]], "recordTotalCount": recordTotalCount })
            }
        );
}
)


app.listen(3000)
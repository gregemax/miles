const musa = require("./class");
const phone = require("./errorclass");
const item = require("./schemas");
exports.highest = async (req, res, next) => {
  req.query.limit = "3";
  req.query.sort = "age";
  next();
};

const cup = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch((er) => next(er));
  };
};

exports.get = cup(async (req, res) => {
  let greg = item.find();
  const llll = new musa(req.query, greg).cup().field().paginaton().sort();

  const max = await llll.doc;
  res.status(200).json({
    result: max.length,

    max,
  });
});
exports.getbyid = cup(async (req, res,next) => {
  const greg = await item.findById(req.params.id);
  if(!greg){
 const err=new phone('no item found',404)
 return next(err)
 
  }
  res.status(200).json(greg);
});
exports.post = cup(async (req, res) => {
  let emax = await item.create(req.body);
  res.status(200).json(emax);
});
exports.Delete = async (req, res) => {
  try {
    let emax = await item.findByIdAndDelete(req.params.id);
    if(!emax){
      const err=new phone('no item found',404)
      return next(err)
       }
    res.status(200).json(emax);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
exports.update = async (req, res) => {
  try {
    const greg = await item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if(!greg){
      const err=new phone('no item found',404)
      return next(err)
       }
    res.status(200).json(greg);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
exports.aggreate = async (req, res) => {
  try {
    const greg = await item.aggregate([
      { $unwind: "$greg" },
      { $match: { greg: req.params.id } },
      { $sort: { age: 1 } },
      { $addFields: { emax: "hi" } },
      { $project: { _id: 0, __v: 0 } },
    ]);
    res.status(200).json({
      result: greg.length,
      greg,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
exports.error = async (req, res, next) => {
  try {
    res.send("go back");
    next();
  } catch (error) {}
};

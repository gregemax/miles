class musa {
  constructor(query, doc) {
    (this.query = query), (this.doc = doc);
  }
  cup() {
    let ref = JSON.stringify(this.query);
    let action = JSON.parse(ref.replace(/\b(gte|gt|lte|le)\b/, (e) => `$${e}`));
    this.doc = this.doc.find(action);
    return this;
  }
  sort() {
    if (this.query.sort) {
      let sort = this.query.sort.split(",").join(" ");
      this.doc = this.doc.sort(sort);
    }
    return this;
  }
  paginaton() {
    let limit = this.query.limit * 1;
    let skip = this.query.page * 1;
    let page = (skip - 1) * limit;
    this.doc = this.doc.skip(page).limit(limit);
    return this;
  }
  field() {
    if (this.query.fields) {
      let sort = this.query.fields.split(",").join(" ");
      this.doc = this.doc.select(sort);
    } else {
      this.doc = this.doc.select("-__v");
    }
    return this;
  }
}

module.exports = musa;

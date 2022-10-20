const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;
mongoose.plugin(slug);
const films = new Schema({
    ten: { type: String, required: true },
    theloai: { type: String, required: true },
    noidung: { type: String, required: true },
    link: { type: String, required: true },
    slug: { type: String, slug: 'ten' },
    date2: {type: String, default: Date.now}
}, 
{
    timestamps:true,
});

module.exports = mongoose.model('films', films);
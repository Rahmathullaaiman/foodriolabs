const menus = require('../SchemaModels/menuschema');

exports.addmenu = async (req, res) => {
    try {
 const userId = req.payload;
     console.log(userId);
     const image = req.file.filename;
     const { Category, foodname, price } = req.body;
     const newMenu = new menus({
           Category,
            foodname,
            image,
            price,
            userId
        });

     await newMenu.save();
 res.status(200).json(newMenu);
    } catch (error) {
        res.status(500).json({error});
    }
};


//edit menu
exports.editmenu = async (req, res) => {
    console.log('inside edit menu');

    const { id } = req.params;
    const { Category, foodname, price } = req.body;
    const uploadedImage = req.file ? req.file.filename : null;
    try {
        const updatedMenu = await menus.findByIdAndUpdate(
            id,
            { Category, foodname, image: uploadedImage, price },
            { new: true }
        );
     if (!updatedMenu) {
            return res.status(404).json({ error: "Menu not found" });
        }
        res.status(200).json(updatedMenu);
    } catch (error) {
        console.error(error); 
        res.status(500).json({ error }); 
    }
};

//get all menu
exports.getAllmenu = async (req, res) => {
    try {
        const getmenu = await menus.find();
        res.status(200).json(getmenu);
    } catch (error) {
        res.status(500).json(error);
    }
}

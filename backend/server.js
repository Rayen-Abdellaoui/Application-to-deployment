const express  = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const { connectToRabbitMQ, consumeFromQueue,publishToQueue } = require('./rabbitmq');


const PORT = 5555;
const mongoose = require('mongoose');
const cors = require('cors');
const UsersModel = require('./models/Users.js');
const WorkShopsModel = require('./models/WorkShops.js');
const ClubModel = require('./models/Club.js');
const ParticipationsModel = require('./models/Participations.js');
const ClubWorkShopsModel = require('./models/ClubWorkShops.js')

const app = express();
app.use(session({
    secret: "securite sa7bi",
    resave:false,
    saveUninitialized: false,
    cookie: { secure: false } ,
}))
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true 
}));

mongoose.connect(process.env.MONGODB_URI)
.then(console.log("Connected to Database"))
.catch("Cant connect to database");


const isLoggedIn = (req, res, next) => { // use it for access to account page
    if (req.session.user) {
      next();
    } else {
      res.status(403).send('Unauthorized access. Please login.');
    }
  };

// Upload Images
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../frontend/public/uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

//User login
app.post("/login",  async(req, res) => {
    const { login_email, login_password } = req.body;
    UsersModel.findOne({email : login_email})
    .then(user =>{
        if(user){
            if(user.password === login_password){
                req.session.user = {username : user.firstname,lastname : user.lastname, user_id : user._id, role : user.role};
                res.send(req.session.user);
            }
            else
                res.send("Wrong Password");
        }
        else{
            res.send("No user with this email")
        }
    })
    .catch(err => console.log(err));

});

// Club login
app.post("/club/login",  async(req, res) => {
    const { login_email, login_password } = req.body;
    ClubModel.findOne({email : login_email})
    .then(club =>{
        if(club){
            if(club.password === login_password){
                req.session.user = {username : club.club_name, user_id : club._id,role : club.role,lastname : club.lastname};
                res.send(req.session.user);
            }
            else
                res.send("Wrong Password");
        }
        else{
            res.send("No club with this email")
        }
    })
    .catch(err => console.log(err));

});

//User Sign in 
app.post("/sign-in",async (req,res) =>{
    const { firstname ,lastname, email ,phone ,password } = req.body;
    try {
        const user = await UsersModel.findOne({ email });
    
        if (user) {
            res.send('Email already exists');
        }
        else{
            await UsersModel.create(req.body);
            const new_user = await UsersModel.findOne({ email });
            req.session.user = {username : new_user.firstname, user_id : new_user._id,role : new_user.role,lastname : new_user.lastname};
            res.send("Logged")
        }
    } 
    catch (err) {
        console.log(err);
    }

})

//Club Sign in
app.post("/club/sign-in",upload.single("club_img"),async (req,res) =>{
    const { club_name,email,password ,club_img} = req.body;
    const imageName = req.file.filename;
    try {
        const club = await ClubModel.findOne({ email });
    
        if (club) {
            res.send('Email already used');
        }
        else{
            const c = await ClubModel.create({club_name : club_name , club_img : imageName , email : email , password : password});
            await ClubWorkShopsModel.create({club_id : c._id ,work_id : []});
            const new_club = await ClubModel.findOne({ email });
            req.session.user = {username : new_club.club_name, user_id : new_club._id,role : new_club.role};
            res.send("Logged")
        }
    } 
    catch (err) {
        console.log(err);
    }

})

//Logout
app.get("/logout",async (req,res) =>{
    try {
        req.session.destroy(() => {
        res.send("Log out Succ");
        });
    } 
    catch (err) {
        console.error(err);
    }

})

//check if user logged
app.get("/api/username", async (req,res) =>{
    if(req.session.user){
        res.status(200).send(req.session.user);
    }
    else{
        res.sendStatus(202);
    }
    }
)

// WorkShops



// Return all workshops
app.get("/workshops", async (req,res) =>{
    const workshops = await WorkShopsModel.find();
    if(workshops)
        res.json(workshops);
    else
        res.json("faiiiiiiiled");

}
)

// Return myworkshop
app.get("/api/myworkshop", async (req, res) => {
    try {
        if (req.session.user) {
            if(req.session.user.role == 'User'){
                const user_id = String(req.session.user.user_id);
                const participations = await ParticipationsModel.findOne({ user_id: user_id });
    
                if (participations && participations.workshop_id.length > 0) {
                    const workshopPromises = participations.workshop_id.map(el => {
                        return WorkShopsModel.findOne({ _id: el });
                    });
                    const workshops = await Promise.all(workshopPromises);
    
                    return res.json(workshops);
                } else {
                    return res.status(207).send('No workshops participated in');
                }
            }
            else{
                const club_id = String(req.session.user.user_id);
                const w = await ClubWorkShopsModel.findOne({ club_id: club_id });
    
                if (w && w.work_id.length > 0) {
                    const workshopPromises = w.work_id.map(el => {
                        return WorkShopsModel.findOne({ _id: el });
                    });
                    const workshops = await Promise.all(workshopPromises);
    
                    return res.json(workshops);
                } else {
                    return res.status(207).send('No workshops participated in');
                }
            }
           
        } else {
            return res.send('login first');
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Delete myworkshop
app.get("/api/delete-myworkshop/:id", async (req, res) => {
    try {
        if (req.session.user) {
            if(req.session.user.role == 'User'){
                const user_id = String(req.session.user.user_id);
            const participations = await ParticipationsModel.findOne({ user_id: user_id });
            const workshop = await WorkShopsModel.findById(req.params.id);

            if (participations && participations.workshop_id.length > 0) {
                const result = await ParticipationsModel.updateOne(
                    { user_id: user_id },
                    { $pull: { workshop_id: req.params.id } })
                    const p = workshop.participants - 1;
                    await WorkShopsModel.updateOne({ _id: req.params.id }, { $set: { participants: p } });
                return res.send("Workshop deleted");
            } else {
                return res.status(207).send('No workshops participated in');
            }
            }
            else{
                const club_id = String(req.session.user.user_id);
                const w = await ClubWorkShopsModel.findOne({ club_id: club_id });

                if (w && w.work_id.length > 0) {
                    const result = await ClubWorkShopsModel.updateOne(
                        { club_id: club_id },
                        { $pull: { work_id: req.params.id } })
                    await WorkShopsModel.findByIdAndDelete({_id : req.params.id});
                    return res.send("Workshop deleted");
            } else {
                return res.status(207).send('No workshops participated in');
            }
            }
        } else {
            return res.send('login first');
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
});

const TestModel = require('./models/Test.js');
app.post("/api/workshop-img", upload.single("workshop_img"), async (req,res) =>{
    const imageName = req.file.filename;
    try {
        await TestModel.create({workshop_img : imageName});
        res.json("Image uploaded");
      } catch (error) {
        res.json({ status: error });
      }
    
})

app.get("/get-image", async (req, res) => {
    try {
        TestModel.find().then((data) => {
        res.send({ data: data });
      });
    } catch (error) {
      res.json({ status: error });
    }
  });

// Return one workshop by id
app.get("/api/workshop/:id", async (req,res) =>{
    const id = req.params.id;
    const workshop = await WorkShopsModel.findOne({_id : id});
    res.json(workshop);
}
)

// Subscription

app.get("/api/subscription/:id", async (req, res) => {
    try {
        if (req.session.user) {
            const user_id = String(req.session.user.user_id);
            const workshop_id = req.params.id;
            const message = { user_id, workshop_id };
                const participations = await ParticipationsModel.findOne({ user_id });
                const workshop = await WorkShopsModel.findById(workshop_id);
            
                if (!workshop) {
                    console.log('Workshop not found');
                    return;
                }
            
                if (participations) {
                    if (participations.workshop_id.indexOf(workshop_id) === -1) {
                        if (workshop.participants >= workshop.max_participants) {
                            console.log("Can't add new Participants");
                            res.status(201).send("Subscription request received. Processing...");
                    
                        } else {
                            const p = workshop.participants + 1;
                            await WorkShopsModel.updateOne({ _id: workshop_id }, { $set: { participants: p } });
                            await ParticipationsModel.updateOne({ _id: participations._id }, { $set: { workshop_id: [...participations.workshop_id, workshop_id] } });
                            console.log(`Participants Updated in workshop with id ${workshop.id}`);
                            res.status(200).send(`Participants Updated in workshop with id ${workshop.id}`);

                        }
                    } else {
                        const p = workshop.participants - 1;
                        await WorkShopsModel.updateOne({ _id: workshop_id }, { $set: { participants: p } });
                        await ParticipationsModel.updateOne({ _id: participations._id }, { $set: { workshop_id: participations.workshop_id.filter(el => el !== workshop_id) } });
                        res.status(202).send(`Participants cancelled for workshop with id ${workshop.id}`);
                    }
                } else {
                    await ParticipationsModel.create({ user_id, workshop_id: workshop_id });
                    const p = workshop.participants + 1;
                    await WorkShopsModel.updateOne({ _id: workshop_id }, { $set: { participants: p } });
                    console.log(`Participants Updated in workshop with id ${workshop.id}`);
                }

            //await publishToQueue('subscriptionQueue', message);

        } else {
            res.sendStatus(207);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
});

async function startApp() {

        app.listen(5555, '0.0.0.0', () => {
            console.log('Server running on port 5555');
          });

}

startApp();

// Check user workshops
app.get("/api/checksubscription/:id", async (req,res) =>{
    try {
        if(req.session.user){
            const user_id = String(req.session.user.user_id);
            const participations = await ParticipationsModel.findOne({user_id : user_id});
            if(participations){
                if(participations.workshop_id.indexOf(req.params.id) == -1){
                    res.sendStatus(200);   
                }
                else{
                    res.sendStatus(203);
                }
            }
            else{
                res.sendStatus(203);
            }
        }
        else{
            res.sendStatus(206);
        } 
    } catch (error) {
        res.status(400).send(error.message);
    }
}
)

// User Info
app.post("/api/user-account",upload.single("profile_img"), async (req,res) =>{
    try {
        if(req.session.user){
            if(req.session.user.role == 'User'){
                const { firstname ,lastname,phone ,password } = req.body;
                const imageName = req.file.filename;
                const user = await UsersModel.findOne({ _id : req.session.user.user_id });
                if (user) {
                    await UsersModel.updateMany(
                        { _id: req.session.user.user_id },
                        { $set: { firstname: firstname, lastname: lastname, phone: phone, password: password,profile_img : imageName } }
                    );                
                    const new_user = await UsersModel.findOne({ _id : req.session.user.user_id });
                    return res.json(new_user);
            }}
            else{
                const { club_name ,password } = req.body;
                const imageName = req.file.filename;
                const club = await ClubModel.findOne({ _id : req.session.user.user_id });
                if (club) {
                    await ClubModel.updateMany(
                        { _id: req.session.user.user_id },
                        { $set: { club_name: club_name,  password: password,club_img : imageName } }
                    );                
                    const new_club = await ClubModel.findOne({ _id : req.session.user.user_id });
                    return res.json(new_club);
            }}
        }
        else{
            res.sendStatus(206);
        } 
    } catch (error) {
        res.status(400).send(error.message);
    }
}
)

app.get("/api/username-account", async (req,res) =>{
    try {
        if(req.session.user){
            if(req.session.user.role == 'User'){
                const user = await UsersModel.findOne({ _id : req.session.user.user_id });
                if (user) {
                    return res.send([user.firstname,user.lastname,user.email,user.phone,user.profile_img]);
                }
                else{
                    res.status(204).send("No user with this id");
                }
            }
            else{
                const club = await ClubModel.findOne({ _id : req.session.user.user_id });
                if (club) {
                    return res.send([club.club_name,club.email,club.club_img]);
                }
                else{
                    res.status(204).send("No club with this id");
                }
            }
            
        }
        else{
            res.sendStatus(206);
        } 
    } catch (error) {
        res.status(400).send(error.message);
    }
}
)

//change user profile pic
app.post("/api/user-profile-pic",upload.single("file"),async (req,res) =>{
    const imageName = req.file.filename;
    try {
        if(req.session.user){
            const user = await UsersModel.findOne({ _id : req.session.user.user_id });
    
            if (user) {
                const result = await UsersModel.updateOne(
                    { _id: req.session.user.user_id },
                    { $set: { profile_img: imageName } });
                res.json(result);
            }
            else{
                res.status(204).send("login first")
            }
        }
        else{
            res.sendStatus(205);
        }
    } 
    catch (err) {
        console.log(err);
    }

})

// add workshops

app.post("/api/add-workshop",upload.single("profile_img"), async (req, res) => {
    try {
        if (req.session.user ) {
            if(req.session.user.role == "Club"){
                const {title ,date ,lang,time, duration, trainers ,max_participants, salle,profile_img} =  req.body;
                const imageName = req.file.filename;
                const club_id = String(req.session.user.user_id);
                const club = String(req.session.user.username);
                let w = await ClubWorkShopsModel.findOne({ club_id: club_id });
                const new_workshop = await WorkShopsModel.create({club : club , title:title ,image:imageName, date:date,lang:lang,time:time,duration:duration,trainers:trainers,max_participants:max_participants,salle:salle});
                if (w) {
                    await ClubWorkShopsModel.updateOne({ club_id: club_id }, { $set: { work_id: [...w.work_id, String(new_workshop._id)] } });
                    return res.send("WorkShop Added");
                }
            }
        } else {
            return res.status(203).send('only with user account');
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// delete workshops

app.get("/api/clubimg/:name", async (req, res) => {
    try {
        const resultat  = await ClubModel.findOne({club_name : req.params.name});
        res.send(resultat.club_img);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.get("/api/workshopslength", async (req, res) => {
    try {
        if (req.session.user ) {
            if(req.session.user.role == "Club"){
                const resultat  = await ClubWorkShopsModel.findOne({club_id: req.session.user.user_id});
                if(resultat.work_id.length == 0){
                    res.sendStatus(202);
                }
                else{
                    res.send("ok");
                }
            }
        } 
    }catch (error) {
        res.status(400).send(error.message);
    }
});


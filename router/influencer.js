const express = require("express");
const router = express.Router();
require("../db/conn");
var http = require("http");
const authenticate = require("../middleware/authenticate");
var fs = require("fs");
path = require("path");
var XLSX = require("xlsx");
const Influencer = require("../model/influencerSchema");

router.post("/uploadDataFromExcelToDb", async (req, res) => {
  // console.log("req.body", req.body);
  // let filePath = req.body.fileData;
  // var workbook = XLSX.readFile(filePath);
  // var sheet_name_list = workbook.SheetNames;
  // var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
  // console.log(xlData);
  // //  filePath = path.join(__dirname, "start.html");

  try {
    let influencerData = [
      {
        s_no: 1,
        name: "TIYASA MISHRA",
        platform: "Instagram",
        handle: "https://www.instagram.com/tiyasamishraofficial",
        genre: "Fashion and Beauty",
        gender: "Female",
        category: "C",
        location: "Kolkata",
        followers: "3450",
        email: "prat.tiya.s@gmail.com",
        contact_no: 8240447216,
      },
      {
        s_no: 2,
        name: "Monika Bansal",
        platform: "Instagram",
        handle: "https://instagram.com/monika_ajm?utm_medium=copy_link",
        genre: "Lifestyle fashion",
        gender: "Female",
        category: "C",
        location: "Ajmer",
        followers: "10680",
        email: "monikabansal.587@gmail.com",
        contact_no: 8619368084,
      },
      {
        s_no: 3,
        name: "Chandan kumar",
        platform: "Instagram",
        handle: "Https://instagram.com/chandan805",
        genre: "Lifestyle",
        gender: "Male",
        category: "B",
        location: "Bangalore",
        followers: "20000",
        email: "chandan805@gmail.com",
        contact_no: 9741078745,
      },
      {
        s_no: 4,
        name: "Ananya runjhun",
        platform: "Instagram",
        handle: "https://instagram.com/ananya_runjhun?utm_medium=copy_link",
        genre: "Lifestyle",
        gender: "Female",
        category: "B",
        location: "Varanasi",
        followers: "56000",
        email: "singhananyaa9@gmail.com",
        contact_no: 8318989746,
      },
      {
        s_no: 5,
        name: "Aishwarya Tapadar",
        platform: "Instagram",
        handle: "https://www.instagram.com/thelostenchantress",
        genre: "Lifestyle",
        gender: "Female",
        category: "A",
        location: "Hyderabad",
        followers: "103000",
        email: "aishwarya.tapadar@gmail.com",
        contact_no: 8583089121,
      },
      {
        s_no: 6,
        name: "Surabhi Tiwari",
        platform: "Instagram",
        handle: "https://www.Instagram.com/Surabhi.tiwari",
        genre: "Fashion, lifestyle, beauty, food, travel",
        gender: "Female",
        category: "A",
        location: "Mumbai",
        followers: "165800",
        email: "Surabhi.tiwari.contact@gmail.com",
        contact_no: 9149360677,
      },
      {
        s_no: 7,
        name: "Rohan Kundu",
        platform: "Instagram",
        handle: "https://www.instagram.com/rohan.kundu11/?hl=en",
        genre: "Fashion lifestyle",
        gender: "Male",
        category: "B",
        location: "Kolkata",
        followers: "15399",
        email: "rkrohankundu@gmail.com",
        contact_no: 7908951695,
      },
      {
        s_no: 8,
        name: "Vedhika Jain",
        platform: "Instagram",
        handle: "https://www.instagram.com/vedhikajain04/",
        genre: "Beauty, lifestyle, fashion",
        gender: "Female",
        category: "B",
        location: "Delhi",
        followers: "71000",
        email: "vedikaj135@gmail.com",
        contact_no: 6387060189,
      },
      {
        s_no: 9,
        name: "Riya Jain",
        platform: "Instagram",
        handle: "https://www.instagram.com/caughtinacuff/",
        genre: "Fashion lifestyle",
        gender: "Female",
        category: "A",
        location: "",
        followers: "335,000",
        email: "vinishabhansali101@gmail.com",
        contact_no: 9324145100,
      },
      {
        s_no: 10,
        name: "Jazz Soni",
        platform: "Instagram",
        handle: "https://www.instagram.com/jazzsoni/",
        genre: "Parenting, Lifestyle",
        gender: "Female",
        category: "A",
        location: "Delhi",
        followers: "154000",
        email: "siagrover@gmail.com",
        contact_no: 9953868214,
      },
      {
        s_no: 11,
        name: "Sumita Kapoor",
        platform: "Instagram",
        handle: "https://www.instagram.com/sumitakapoor14003/",
        genre: "Parenting, Lifestyle",
        gender: "Female",
        category: "B",
        location: "Delhi",
        followers: "88,400",
        email: "sumitamalhotra14@gmail.com",
        contact_no: 9871004471,
      },
      {
        s_no: 12,
        name: "Shlok Srivastav",
        platform: "Instagram",
        handle: "https://www.instagram.com/techburner/",
        genre: "Tech",
        gender: "Male",
        category: "A",
        location: "Mumbai",
        followers: "562,000",
        email: "techburner2@gmail.com",
        contact_no: null,
      },
      {
        s_no: 13,
        name: "PV Sindhu",
        platform: "Instagram",
        handle: "https://www.instagram.com/pvsindhu1/",
        genre: "Sports",
        gender: "Female",
        category: "A",
        location: "Mumbai",
        followers: "2.7M",
        email: "partnerships@baselineventures.com",
        contact_no: null,
      },
      {
        s_no: 14,
        name: "Aditya Sawant(Dynamo)",
        platform: "Instagram",
        handle: "https://www.instagram.com/dynamo__gaming/",
        genre: "Gaming",
        gender: "Male",
        category: "A",
        location: "Mumbai",
        followers: "2.2M",
        email: "work@dynamogaming.co",
        contact_no: null,
      },
      {
        s_no: 15,
        name: "Sharan Hegde",
        platform: "Instagram",
        handle: "https://www.instagram.com/financewithsharan/",
        genre: "Finance",
        gender: "Male",
        category: "A",
        location: "",
        followers: "573K",
        email: "financewithsharan@gmail.com",
        contact_no: null,
      },
      {
        s_no: 16,
        name: "Danish Sait",
        platform: "Instagram",
        handle: "https://www.instagram.com/danishsait/",
        genre: "Comedy",
        gender: "Male",
        category: "A",
        location: "Bangalore",
        followers: "1.2M",
        email: "",
        contact_no: null,
      },
      {
        s_no: 17,
        name: "Anunay Sood",
        platform: "Instagram",
        handle: "https://www.instagram.com/anunaysood/",
        genre: "Travel/Photographer",
        gender: "Male",
        category: "A",
        location: "",
        followers: "670k",
        email: "",
        contact_no: null,
      },
      {
        s_no: 18,
        name: "Pawan",
        platform: "YouTube",
        handle: "https://www.youtube.com/channel/UCypbyU1SnkdyWjC4OrChp_Q",
        genre: "Grooming",
        gender: "Male",
        category: "B",
        location: "",
        followers: "140k",
        email: "pawanyudikhatri0016@gmail.com",
        contact_no: 9044715149,
      },
      {
        s_no: 19,
        name: "Dilip",
        platform: "YouTube",
        handle: "https://www.youtube.com/channel/UCvj7LHny7g9vGb9l60JRTvQ",
        genre: "Health",
        gender: "Male",
        category: "B",
        location: "",
        followers: "410k",
        email: "",
        contact_no: 6375392171,
      },
      {
        s_no: 20,
        name: "Mithilesh Backpacker",
        platform: "YouTube",
        handle:
          "https://www.youtube.com/channel/UCLmnb38gWWR2E9h6hP4nBUA/videos",
        genre: "Travel",
        gender: "Male",
        category: "A",
        location: "",
        followers: "438k",
        email: "mithileshblacky0@gmail.com",
        contact_no: null,
      },
      {
        s_no: 21,
        name: "Faisal Khan",
        platform: "YouTube",
        handle: "https://www.youtube.com/channel/UCPF4bAZimS4T8w1TlbeIAYg",
        genre: "Auto",
        gender: "Male",
        category: "A",
        location: "",
        followers: "627k",
        email: "",
        contact_no: null,
      },
      {
        s_no: 22,
        name: "Men's Fashion Tamil",
        platform: "YouTube",
        handle:
          "https://www.youtube.com/channel/UCkcBMCcuoaL-LTaMk3P7vmw/videos",
        genre: "Fashion ",
        gender: "Male",
        category: "A",
        location: "",
        followers: "626k",
        email: "",
        contact_no: 9500243690,
      },
      {
        s_no: 23,
        name: "The Real Men Show",
        platform: "YouTube",
        handle:
          "https://www.youtube.com/channel/UCSMlx2hdgZwsjCi2f6ZFI8Q/about",
        genre: "Fitness and Fashion",
        gender: "Male",
        category: "B",
        location: "",
        followers: "239k",
        email: "the.real.men.show6@gmail.com",
        contact_no: 8369627826,
      },
      {
        s_no: 24,
        name: "Looking Good , Feeling Fab",
        platform: "YouTube",
        handle: "https://www.youtube.com/user/lookingoodfeelingfab",
        genre: "Health and Fitness",
        gender: "Female",
        category: "C",
        location: "",
        followers: "28k",
        email: "lookingoodfeelingfab@gmail.com",
        contact_no: null,
      },
      {
        s_no: 25,
        name: "INDIANGIRLCHANNEL TRISHA",
        platform: "YouTube",
        handle: "https://www.youtube.com/channel/UC2QBCIyo_FbTlm0Rfh_6wkw",
        genre: "Beauty / Fashion and Lifestyle",
        gender: "Female",
        category: "A",
        location: "",
        followers: "2.51M",
        email: "trishapaul16@gmail.com",
        contact_no: null,
      },
      {
        s_no: 26,
        name: "Arpita Nath ",
        platform: "YouTube",
        handle: "https://www.youtube.com/channel/UCgDQ1iWbI3jE3BXPQ9WrdeQ",
        genre: "Health and lifestyle",
        gender: "Female",
        category: "A",
        location: "",
        followers: "1.02M",
        email: "aarpitanath@gmail.com",
        contact_no: null,
      },
      {
        s_no: 27,
        name: "My DIY Hub",
        platform: "YouTube",
        handle: "https://www.youtube.com/channel/UCgnN3GL0oBe6bVzHtQGQq5Q",
        genre: "Beauty / Home remedies / DIY / reviews",
        gender: "Female",
        category: "B",
        location: "",
        followers: "429k",
        email: "mydiyhub@gmail.com",
        contact_no: null,
      },
      {
        s_no: 28,
        name: "Simplify Your Space",
        platform: "YouTube",
        handle: "https://www.youtube.com/channel/UC2GT4HiSvUipWNwcWUM7iJQ",
        genre: "Organize / Decor/ DIY / Cleaning",
        gender: "Female",
        category: "A",
        location: "",
        followers: "1.11M",
        email: "simplifyyourspace.tv@gmail.com",
        contact_no: 9962296916,
      },
      {
        s_no: 29,
        name: "Indian mom vlogs Latha",
        platform: "YouTube",
        handle: "https://www.youtube.com/channel/UCoEct5YpsxU4is3xc70yUNg",
        genre: "Housework / Parenting",
        gender: "Female",
        category: "C",
        location: "",
        followers: "6.97k",
        email: "latha.lukose@gmail.com",
        contact_no: null,
      },
      {
        s_no: 30,
        name: "Pranjal Kamra",
        platform: "YouTube",
        handle: "https://www.youtube.com/channel/UCwAdQUuPT6laN-AQR17fe1g",
        genre: "Value Investing | Finology ",
        gender: "Male",
        category: "A",
        location: "",
        followers: "2.6M",
        email: "\tsupport@finology.in",
        contact_no: null,
      },
      {
        s_no: 31,
        name: "Finnovationz.com",
        platform: "YouTube",
        handle: "https://www.youtube.com/channel/UCUMccND2H_CVS0dMZKCPCXA",
        genre: "Stock Markets | Trading ",
        gender: "Male",
        category: "A",
        location: "",
        followers: "1.48M",
        email: "\tcontact@finnovationz.com",
        contact_no: null,
      },
      {
        s_no: 30,
        name: "Prasad Np",
        platform: "Twitter",
        handle: "https://twitter.com/desitraveler",
        genre: "Travel",
        gender: "Male",
        category: "C",
        location: "",
        followers: "8308",
        email: "thedesitraveler@gmail.com",
        contact_no: 7042547779,
      },
      {
        s_no: 31,
        name: "Rishabh Surana",
        platform: "Twitter",
        handle: "https://twitter.com/rishabhanalyst",
        genre: "Finance/Investment",
        gender: "Male",
        category: "A",
        location: "Noida",
        followers: "153828",
        email: "rishabhsuranamarketanalyst@gmail.com",
        contact_no: 9013881106,
      },
      {
        s_no: 32,
        name: "Shifa Merchant",
        platform: "Twitter",
        handle: "https://twitter.com/SassyShifSays",
        genre: "Lifestyle,Beauty",
        gender: "Female",
        category: "C",
        location: "",
        followers: "7469",
        email: "info@sassyshifsays.in",
        contact_no: 9930221214,
      },
      {
        s_no: 33,
        name: "Ankita",
        platform: "Twitter",
        handle: "https://twitter.com/lady_gabbar",
        genre: "Lifestyle",
        gender: "Female",
        category: "B",
        location: "Mumbai",
        followers: "39,800",
        email: "ankitasharma663@gmail.com",
        contact_no: 9706429659,
      },
      {
        s_no: 34,
        name: "Jaey Gajera",
        platform: "Twitter",
        handle: "https://twitter.com/jaeygajeraindia",
        genre: "Actor",
        gender: "Male",
        category: "B",
        location: "Mumbai",
        followers: "52307",
        email: "jaeygajera@yahoo.in",
        contact_no: 9022237894,
      },
      {
        s_no: 35,
        name: "Neha Mathur",
        platform: "Twitter",
        handle: "https://twitter.com/whiskaffair",
        genre: "Food",
        gender: "Female",
        category: "C",
        location: "Bangalore",
        followers: "5476",
        email: "msnehamathur@gmail.com",
        contact_no: 9845946421,
      },
      {
        s_no: 36,
        name: "Maitreni",
        platform: "Twitter",
        handle: "https://twitter.com/MaitreniMishra",
        genre: "Lifestyle",
        gender: "Female",
        category: "B",
        location: "Delhi",
        followers: "10950",
        email: "m.maitreni@gmail.com",
        contact_no: 7277659333,
      },
      {
        s_no: 37,
        name: "Pritam Sharma",
        platform: "Twitter",
        handle: "https://twitter.com/VanDiablo",
        genre: "Sports",
        gender: "Male",
        category: "C",
        location: "Bangalore",
        followers: "9166",
        email: "sharma.pritam@yahoo.co.in",
        contact_no: 7259526249,
      },
      {
        s_no: 38,
        name: "Deena Pinto",
        platform: "Twitter",
        handle: "https://twitter.com/skinnygirldee",
        genre: "Lifestyle",
        gender: "Female",
        category: "C",
        location: "Bangalore",
        followers: "2439",
        email: "skinnygirldiariez@gmail.com",
        contact_no: 9845048531,
      },
      {
        s_no: 39,
        name: "Jitaditya Narzary",
        platform: "Twitter",
        handle: "https://twitter.com/travellingslack",
        genre: "Travel",
        gender: "Male",
        category: "C",
        location: "Delhi",
        followers: "5386",
        email: "thetravellingslacker@gmail.com",
        contact_no: 9560292676,
      },
      {
        s_no: 40,
        name: "Oindrila De",
        platform: "Twitter",
        handle: "https://twitter.com/oindrilade",
        genre: "Travel",
        gender: "Female",
        category: "C",
        location: "Mumbai",
        followers: "1867",
        email: "de.oindrila@gmail.com",
        contact_no: 9819036699,
      },
      {
        s_no: 44,
        name: "Mitchellez",
        platform: "Twitter",
        handle: "https://twitter.com/mitchellez",
        genre: "",
        gender: "Female",
        category: "C",
        location: "",
        followers: "6434",
        email: "mitchellerj@gmail.com",
        contact_no: 9930887335,
      },
      {
        s_no: 45,
        name: "Sharat Chandra",
        platform: "LinkedIn",
        handle: "https://www.linkedin.com/in/sharatc/",
        genre: "",
        gender: "Male",
        category: "B",
        location: "",
        followers: "21,654",
        email: "",
        contact_no: null,
      },
      {
        s_no: 46,
        name: "Garima Bhardawaj",
        platform: "LinkedIn",
        handle: "https://www.linkedin.com/in/garimabharadwaj/",
        genre: "",
        gender: "Female",
        category: "B",
        location: "Mumbai",
        followers: "19,588",
        email: "",
        contact_no: null,
      },
      {
        s_no: 47,
        name: "Anand Prakash Jangid",
        platform: "LinkedIn",
        handle: "https://www.linkedin.com/in/anandjangid",
        genre: "Finance,Tech",
        gender: "Male",
        category: "B",
        location: "Bangalore",
        followers: "10,393",
        email: "",
        contact_no: null,
      },
      {
        s_no: 48,
        name: "Ram Prasad",
        platform: "LinkedIn",
        handle: "https://www.linkedin.com/in/ram-prasadh-73063344/",
        genre: "Tech",
        gender: "Male",
        category: "C",
        location: "Bangalore",
        followers: "8,867",
        email: "",
        contact_no: null,
      },
      {
        s_no: 49,
        name: "Warren.K",
        platform: "LinkedIn",
        handle: "https://www.linkedin.com/in/warren-k-neuburger/",
        genre: "",
        gender: "Male",
        category: "B",
        location: "",
        followers: "13,674",
        email: "",
        contact_no: null,
      },
      {
        s_no: 50,
        name: "Tom Flitter",
        platform: "LinkedIn",
        handle: "https://www.linkedin.com/in/tom-flitter/",
        genre: "",
        gender: "Male",
        category: "C",
        location: "",
        followers: "1,150",
        email: "",
        contact_no: null,
      },
    ];

    await Influencer.insertMany(influencerData);

    res.send(`file read successfull`);
  } catch (error) {
    console.log("error------", error);
  }
});

module.exports = router;
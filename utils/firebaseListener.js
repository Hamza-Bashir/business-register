require("dotenv").config();
const admin = require("firebase-admin");
const { initializeApp } =  require ("firebase/app");
const { getDatabase } = require( "firebase/database");
const { ref, onChildAdded, onChildChanged, onChildRemoved } = require( "firebase/database");
const serviceAccount = require('../serviceAccountKey.json')

const {AudioRoom} = require('../models');
const { NOW } = require("sequelize");

const app = initializeApp({
    credential:admin.credential.cert(serviceAccount),
    databaseURL : 'https://roccovideo-40099-default-rtdb.asia-southeast1.firebasedatabase.app' ,
});

const db = getDatabase(app);



const audioRef = ref(db, 'audio_room');

onChildAdded(audioRef, async(snapshot) => {

    const addedElement = snapshot.val();
    const addedElementId = snapshot.key;

    try{
        if (addedElement.isLiveStreaming) {


            const exists = await AudioRoom.findOne({
                where: { firebaseId: addedElementId },
              });

              if(!exists){
                const countryDetail = null;
                const isPublic = addedElement?.type == "public" ? true : false;
                await AudioRoom.create({
                    firebaseId: addedElementId,
                    roomId: addedElement.roomId,
                    hostId: addedElement?.host?.id,
                    hostName: addedElement?.host.username,
                    liveStart: new Date(),
                    // boostAt: new Date(),
                    // tag : addedElement?.tags[0]|| "ABC",
                    // location: {
                    //   type: 'Point',
                    //   coordinates: [addedElement.lat, addedElement.lng],
                    // },
                    isPublic : isPublic,
                    privateRoomId : addedElement.privateRoomId,
                    country : countryDetail?.name || null
                  });

              }


        }

    }catch(err){
        console.log('err: ', err);
    }
});

// Listen for changes to existing records
onChildChanged(audioRef, async(snapshot) => {

    // console.log('Record updated:', snapshot.key, snapshot.val())

    const changedElement = snapshot.val();
    const addedElementId = snapshot.key;


    try{

        if (!changedElement.isLiveStreaming) {
            const audioStream = await AudioRoom.findOne({
              where:{
                firebaseId: addedElementId,
              }
            });
  
            if (audioStream) {


                let liveStart = new Date(audioStream.liveStart).toISOString();
                let liveEnd = new Date().toISOString();

                let totalSeconds = Math.floor(
                    (new Date().getTime() - new Date(audioStream.liveStart).getTime()) /
                      1000,
                  );

                  await AudioRoom.update(
                    {
                      liveEnd,
                      totalSeconds,
                      totalDiamondEarn: changedElement.totalDiamond,
                      totalStarEarn: changedElement.totalStar,
                      totalViewers: changedElement.viewerCount,
                    },
                    {
                        where:{
                            firebaseId: addedElementId,
                          },
                    }
                  );
      


            }
        }

    }catch(err){
        console.log('err: ', err);
    }
});

onChildRemoved(audioRef, async(snapshot) => {

    const data = snapshot.val();
    console.log('Record removed:', snapshot.key, snapshot.val());
});



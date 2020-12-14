import { db } from './firebase';

class DBService {
    async writeChats(refId,message) {
        return db.ref(refId+"/list/" + message.uid).set({
            content: message.content,
            timestamp: message.timestamp,
            uid: message.uid
        });
    }
    getList(refId){
        let abc=[];
        db.ref(refId).on("value", snapshot => {
            snapshot.forEach(snap => {
              abc.push(snap.val());
              console.log(snap);
            });
        });
        return abc;
    }
}
  
export default new DBService();
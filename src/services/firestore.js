import { firestore } from './firebase';

const db = firestore.collection("/rooms");

class RoomService {
    getAll() {
      return db;
    }

    getById(id){
        return db.doc(id).get();
    }
  
    create(tutorial) {
      return db.add(tutorial);
    }
  
    update(id, value) {
      return db.doc(id).update(value);
    }
  
    delete(id) {
      return db.doc(id).delete();
    }
  }
  
export default new RoomService();


//Imports
import mongoose from 'mongoose'
import fancyLog from 'fancy-log'
import { ILog } from '../../sharedLayer/log.js';

//Create the ts schema
interface IDBLog extends ILog,mongoose.Document{_id?: string;}

//Create mongoose schema
let logSchema = new mongoose.Schema({
    title: String,
    message: String,
});

//Init the schema with mongo
const log:mongoose.Model<IDBLog> = mongoose.model<IDBLog>("log", logSchema);

//Function for logging items
export function LogItem(item:ILog) {

    //Validate log
    //Nothing to validate here.

    //Loggin to screen
    let output: string = ""
    output += "mtdServer " // + moment(log.createdAt).format("YYYY-MM-DD HH:mm") + ") "
    if (item.title != "") output += item.title + ". "
    if (item.message != "") output += item.message + ". "
    fancyLog.info('mtdServer', "'" + "\x1b[36m" + item.title + "\x1b[37m" + "'", item.message + ".", "\x1b[37m")

    //Create the DBObject and save it
    let insertSystemLog = new log(item);
    insertSystemLog.save().then((log) => { }).catch(err => { console.log("Could not save log message: " + err) })

}

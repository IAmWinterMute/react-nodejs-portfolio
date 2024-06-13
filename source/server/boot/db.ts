import mongoose from 'mongoose'
import { LogItem } from '../models/dbLog.js';


//Connecting to database
export function connectToMongoDB(): Promise<boolean> {
    return mongoose.connect(
        'mongodb+srv://' + process.env.DB_USERNAME + ':' + process.env.DB_PASSWORD + '@mtd-cluster.mongocluster.cosmos.azure.com/' + process.env.DB_DATABASE + '?tls=true&authMechanism=SCRAM-SHA-256&retrywrites=false&maxIdleTimeMS=120000',
        {}).then(() => {
            LogItem({ title: "Database connection", message: "DB Connection successful to " + process.env.DB_DATABASE })
            return true
        }).catch((err) => {
            throw(err)
        });
}
mongoose.connection.on('error', err => {});
mongoose.connection.on('disconnected', () => {});
mongoose.connection.on('reconnect', () => {});

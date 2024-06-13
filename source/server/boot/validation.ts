

// Validating all Environment variables needed to boot the system
export function validateEnvironmentVariables(): boolean {
   
   
    if (!process.env.DB_USERNAME || !process.env.DB_PASSWORD || !process.env.DB_DATABASE) {
        console.log("DB Paths not set correctly! Please set DBPaths and try again!")
        return false
    }

    return true
}
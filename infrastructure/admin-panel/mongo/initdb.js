db.createUser(
    {
        user: "iot",
        pwd: "iot",
        roles: [
            {
                role: "readWrite",
                db: "iot_db"
            }
        ]
    }
)

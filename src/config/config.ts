export abstract class Config {
    public static mongoUrl = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST_NAME}/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`;
  }
  
  
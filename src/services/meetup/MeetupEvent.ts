export default class MeetupEvent {
  constructor(
    public summary: String,
    public description: String,
    // public created: Date,
    // public geo: [Number, Number],
    public location: String,
    public url: String,
    public uid: String,
    public lastModified: Date,
    // public dtStamp: Date,
    public dtStart: Date,
    public dtEnd: Date
  ) {}
}

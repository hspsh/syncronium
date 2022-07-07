class EventState {
    constructor(
        public id: String,
        public link: String | null,

        public title: String,
        public description: String | null,

        // base64
        public image: String | null,

        // FORMAT
        // new Date().toISOString()
        // '2022-07-07T19:12:43.593Z'
        public startDate: String,
        public endDate: String,
        public location: String
    ) {
    }
}
export class EventState {
  constructor(
    public id: string,
    public link: string | null,
    public title: string,
    public description: string | null,
    // base64
    public image: string | null,
    // FORMAT
    // new Date().toISOString()
    // '2022-07-07T19:12:43.593Z'
    public startDate: string,
    public endDate: string,
    public location: string
  ) {}
}

export class Bill {
  constructor(
    public id: number,
    public type: string,
    public title: string,
    public sender: string,
    public receiver: string,
    public status: string,
    public description: string,
    public amount: number,
    public paymentMethod: string,
    public date: Date
  ) {}
}

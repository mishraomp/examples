import * as mongoose from "mongoose";
export class Employee {
    private employeeModel: mongoose.Model<any>;
    constructor() {
        const schema = mongoose.Schema;
        const employeeSchema = new schema({
            age: {
                type: Number,
                required: [true, 'Age is mandatory.']
            },
            employeeName: {
                type: String,
                index: true,
                required: [true, 'Name is mandatory.']
            },
            employeeId: {
                type: String,
                unique: true,
                index: true,
                required: [true, 'ID is mandatory.']
            }
        });
        this.employeeModel = mongoose.model('employee', employeeSchema);
    }
    public model(employeeId: string, employeeName: string, age: number): any {
        const employeeModel = new this.employeeModel({ employeeName: employeeName, employeeId: employeeId, age: age });
        return employeeModel;
    }
    async doAnything(): Promise<any> {
        new Employee().model('123546', 'om', 23).save
    }
}
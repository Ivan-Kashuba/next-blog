export default class DateHelper {
    isoString?: string;
    date: Date;
    year: string | number;
    month: string | number;
    day: string | number;

    constructor(isoString?: string) {
        this.isoString = isoString;
        this.date = new Date(this.isoString || '');
        this.year = this.addZeroIfNeed(this.date.getFullYear());
        this.month = this.addZeroIfNeed(this.date.getMonth() + 1);
        this.day = this.addZeroIfNeed(this.date.getDate());
    }

    addZeroIfNeed(numb: number) {
        if (numb > 9) {
            return numb;
        }
        return `0${numb}`;
    }

    formatToPointDDMMYYYY() {
        return [this.day, this.month, this.year].join('.');
    }
}

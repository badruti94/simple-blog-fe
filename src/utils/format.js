import moment from "moment";
import 'moment/locale/id';

export const formatDate = (date) => moment(date).format("MMM DD YYYY")
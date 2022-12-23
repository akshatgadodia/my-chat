import BaseController from './BaseController.js';

export default class RoomController extends BaseController {
  joinRoom = ({ roomId, name }) => {
    this.socket.join(roomId);
    this.socket.username=name;
  };
}

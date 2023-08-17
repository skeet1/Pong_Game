"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const platform_socket_io_1 = require("@nestjs/platform-socket.io");
class SocketAdapter extends platform_socket_io_1.IoAdapter {
    createIOServer(port, options) {
        const server = super.createIOServer(port, { ...options, cors: true });
        return server;
    }
}
exports.default = SocketAdapter;
//# sourceMappingURL=Socket.Adapter.js.map
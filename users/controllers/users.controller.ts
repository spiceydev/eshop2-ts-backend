// import express for request response types
import express from 'express';
import usersService from '../services/users.service';
import argon2 from 'argon2';
import debug from 'debug';

const log: debug.IDebugger = debug('ap:users-controller');

class UsersController {
  async listUsers(req: express.Request, res: express.Response) {
    const users = await usersService.list(100, 0);
    return res.status(200).send(users);
  }

  async listAllUser(req: express.Request, res: express.Response) {
    const users = await usersService.listAll();
    return res.status(200).send(users);
  }

  async getUserById(req: express.Request, res: express.Response) {
    const user = await usersService.readById(req.body.id);
    return res.status(200).send(user);
  }

  async createUser(req: express.Request, res: express.Response) {
    req.body.password = await this.hashPassword(req.body.password);
    const userId = await usersService.create(req.body);
    return res.status(200).send({ id: userId });
  }

  async patch(req: express.Request, res: express.Response) {
    if (req.body.password) {
      req.body.password = await this.hashPassword(req.body.password);
    }
    log(await usersService.patchById(req.body.id, req.body));
    return res.status(204).send();
  }

  async put(req: express.Request, res: express.Response) {
    if (req.body.password) {
      req.body.password = await this.hashPassword(req.body.password);
    }
    log(await usersService.putById(req.body.id, req.body));
    return res.status(204).send();
  }

  async hashPassword(password: string) {
    return await argon2.hash(password);
  }
}

export default new UsersController();

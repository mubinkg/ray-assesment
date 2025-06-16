import express from 'express';
import type { Request, Response } from 'express';
import { RequestUserQuery, User, UsersResponse } from '../interfaces/User';
import { getUsers, createUser, updateUser, deleteUser } from '../services/user';
import { query, body, param, validationResult } from 'express-validator'

const router = express.Router();

router.get<{}, UsersResponse>(
  '/',
  query('limit').isInt().toInt(), query('offset').isInt().toInt(),
  (req: Request, res: Response) => {
    const { limit, offset } = req.query as unknown as RequestUserQuery
    const userResult = getUsers(limit, offset)
    res.json({
      result: userResult,
      message: "User list found!"
    })
  });


router.post<{}, { result: User; message: string }>(
  '/',
  body('name').isString().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    console.log(errors)
    if (!errors.isEmpty()) {
      return res.status(422).json({
        message: "Validation error",
        errors: errors.array()
      })
    }
    const { name, email } = req.body as User;

    const newUser = createUser({ name, email });

    res.status(201).json({
      result: newUser,
      message: 'User created successfully!'
    });
  }
);

router.put<{}, { result: User | null; errors: Record<string, any>[] | null, message: string }>(
  '/:id',
  param('id').isInt(),
  body('name').optional().isString(),
  body('email').optional().isEmail(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        message: "Validation error",
        errors: errors.array(),
        result: null
      })
    }

    const { id } = req.params as unknown as { id: number };
    const { name, email } = req.body;

    // Update user
    const updatedUser = updateUser({ id, name, email });

    if (updatedUser === null) {
      return res.status(404).json({
        message: "User not found",
        errors: null,
        result: null
      })
    } else {
      return res.status(200).json({
        message: "User updated successfully",
        errors: null,
        result: updatedUser
      })
    }
  }
);

// DELETE User by ID
router.delete<{}, { result: User | null; errors: Record<string, any>[] | null, message: string }>(
  '/:id',
  param('id').isInt(),
  (req, res) => {
    const { id } = req.params as unknown as { id: number };
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        message: "Validation error",
        errors: errors.array(),
        result: null
      })
    }

    // Delete user
    const deletedUser = deleteUser(id);
    if (deletedUser === null) {
      return res.status(404).json({
        message: "User not found",
        errors: null,
        result: null
      })
    } else {
      return res.status(200).json({
        message: "User deleted successfully",
        errors: null,
        result: deletedUser
      })
    }
  }
);

export default router;

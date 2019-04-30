import {Request, Response} from 'express';
import {COURSES} from './db-data';

export function getAllCourses(req: Request, res: Response) {
  console.log('Retrieving courses data ...');

  res.status(200).json({payload: Object.values(COURSES)});
}

export function getCourseById(req: Request, res: Response) {
  console.log('Retrieving a course...');

  const courseId = parseInt(req.params['id'], 10);

  const course = Object
    .values(COURSES)
    .find(c => c.id === courseId);

  res.status(200).json(course);
}

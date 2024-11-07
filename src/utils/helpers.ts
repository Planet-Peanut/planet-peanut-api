import { Class } from '../class/schemas/class.schema';
import { Run } from '../run/schemas/run.schema';
import { Model, PipelineStage } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export function startDate() {
  const firstDay = new Date();
  firstDay.setDate(1);
  firstDay.setHours(0, 0, 0, 0);
  return firstDay;
}

export async function getListofClasses(
  _Class: Model<Class>,
): Promise<Record<string, any>[]> {
  const aggregateQuery = [
    {
      $lookup: {
        from: 'schools', // the collection to join
        localField: 'name', // field from the Class collection
        foreignField: 'school', // field from the School collection to match on
        as: 'school_info', // output array containing the joined documents
      },
    },
    {
      $unwind: '$school_info', // Deconstructs the school_info array
    },

    {
      $project: {
        classname: {
          school: '$name',
          grade: '$grade',
          letter: '$letter',
        },
      },
    },
  ];

  const result = await _Class.aggregate(aggregateQuery);
  const resultsWithRandomId = result
    .slice(0, 100)
    .map((eachDoc) => ({ ...eachDoc, score: 0, id: uuidv4() }));
  return resultsWithRandomId;
}

export async function getCompetitionBoardQuery(
  { n, area, school, startDate, endDate, country },
  run: Model<Run>,
): Promise<Record<string, any>[]> {
  let matchedCriteria = {
    createdAt: { $gte: startDate, $lte: endDate },
    className: { $ne: null },
    'classname.school': { $ne: '' },
    'classname.grade': { $ne: '' },
    'classname.letter': { $ne: '' },
  };
  // Only add classname criteria if school is provided
  if (area === 'school') {
    matchedCriteria = {
      ...matchedCriteria,
      'classname.school': school,
    };
  }

  try {
    const aggregateQuery: PipelineStage[] = [
      {
        $match: matchedCriteria,
      },
      {
        $lookup: {
          from: 'schools', // Collection name of the school schema
          localField: 'classname.school',
          foreignField: 'school',
          as: 'schoolInfo',
        },
      },
      {
        $unwind: '$schoolInfo',
      },
      {
        $match: {
          'schoolInfo.country': country,
        },
      },
      {
        $group: {
          _id: {
            school: '$classname.school',
            grade: '$classname.grade',
            letter: '$classname.letter',
          },
          totalScore: { $sum: '$score' },
        },
      },
      {
        $project: {
          classname: '$_id',
          score: '$totalScore',
          id: '$_id',
        },
      },
      {
        $sort: { score: -1 },
      },
    ];

    const result = await run.aggregate(aggregateQuery);

    const resultsWithRandomId = result.slice(0, n).map((doc) => ({
      ...doc,
      id: uuidv4(), // Add a random UUID to each document
    }));
    return resultsWithRandomId;
  } catch (error) {
    console.log('Inside class run ', error);
  }
}

export function mergeAndSortArrays(
  array1: Record<string, any>[],
  array2: Record<string, any>[],
): Record<string, any>[] {

  // Merge the two arrays
  const mergedArray = [...array1, ...array2];
  // Remove duplicates based on classname (school, grade, letter), keeping the entry with the highest score
  const uniqueByClassname = mergedArray.reduce<
    Map<string, Record<string, any>>
  >((acc, current) => {
    // Create a unique key from classname properties
    const key = `${current.classname.school}-${current.classname.grade}-${current.classname.letter}`;

    // Assert that current has the expected properties
    const currentEntry = current as Record<string, any>;

    // If the key is not yet in the accumulator or the current score is higher, add/replace it
    if (!acc.has(key) || acc.get(key)?.score < currentEntry.score) {
      acc.set(key, currentEntry);
    }
    return acc;
  }, new Map());

  // Convert the Map values back to an array
  const uniqueArray = Array.from(uniqueByClassname.values());

  // Sort the array by score in descending order
  uniqueArray.sort((a, b) => b.score - a.score);
  return uniqueArray;
}

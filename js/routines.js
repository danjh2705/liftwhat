var routines = { 
  all: [
      {name: 'Coan Phillipi Deadlift',
       inputs: [
          { type: "number",
            value: "current_max_deadlift"
          },
          { type: "number",
            value: "target_max_deadlift"
          }
      ],
       type: 'Deadlift Specific'
      },
      {name: 'Magnusson Ortmayer Deadlift',
       inputs: [
          { type: "number",
            value: "target_max_deadlift"
          }
      ],
       type: 'Deadlift Specific'
      },
      {name: 'Russian Squat',
       inputs: [
          { type: "number",
            value: "current_max_squat"
          }
       ],
        type: 'Squat Specific'
      },
      {name: 'Smolov Squat: Part One',
       inputs: [
          { type: "number",
            value: "current_max_squat"
          }
       ],
        type: 'Squat Specific'
      },
      {name: 'Smolov Squat: Part Two',
       inputs: [
          { type: "number",
            value: "current_max_squat"
          }
       ],
        type: 'Squat Specific'
      },
      {name: 'Smolov jr',
       inputs: [
          { type: "select",
            value: "which_lift",
            options: [
              'Squat',
              'Bench',
              'Deadlift'
            ]
          },
          {
            type: "number",
            value: "current_max"
          }
       ],
        type: 'Powerlifting'
      },
      {name: 'Prilepins Chart',
       inputs: [
          {
            type: "number",
            value: "prilepin_training_max"
          }
       ],
        type: 'Unspecified'
      },
      {name: 'Korte 3x3',
       inputs: [
          {
            type: "number",
            value: "current_max_squat"
          },
          {
            type: "number",
            value: "current_max_bench"
          },
          {
            type: "number",
            value: "current_max_deadlift"
          }
       ],
        type: 'Powerlifting'
      },
      {name: 'Sheiko 29',
       inputs: [
          {
            type: "number",
            value: "current_max_squat"
          },
          {
            type: "number",
            value: "current_max_bench"
          },
          {
            type: "number",
            value: "current_max_deadlift"
          }
       ],
        type: 'Powerlifting'
      },
      {name: 'Sheiko 30',
       inputs: [
          {
            type: "number",
            value: "current_max_squat"
          },
          {
            type: "number",
            value: "current_max_bench"
          },
          {
            type: "number",
            value: "current_max_deadlift"
          }
       ],
        type: 'Powerlifting'
      }/*,
      {name: 'Brandon Lillys Cube Method',
       inputs: [
          {
            type: "number",
            value: "current_max_squat"
          },
          {
            type: "number",
            value: "current_max_bench"
          },
          {
            type: "number",
            value: "current_max_deadlift"
          },
          {
            type: "multiselect",
            value: "squat_assistance",
            options: [
              'Front Squat',
              'Olympic Squat',
              'Leg Press',
              'Lunges',
              'Stiff Leg Deadlifts',
              'Leg Extensions',
              'Leg Curls',
              'Good Mornings',
              'Snatch Grip Deadlifts',
              'Barbell Rows',
              'Dumbbell Rows',
              'Lat Pulldows',
              'Chest Supported Rows',
              'Shrugs',
              'Abs',
              'Glute Ham Raise',
              'Pullups'
            ]
          },{
            type: "multiselect",
            value: "bench_assistance",
            options: [
              'Close Grip Bench',
              'Tricep Pushdown',
              'Kaz Presses',
              'Military Presses',
              'Bicep Curls',
              'Shoulder Front or Side Raise',
              'Upright Row',
              'Abs',
              'Forearm Rolls',
              'Pec Flyes',
              'Fat Bar Bench',
              'Push Ups',
              'Dips',
              'Incline Press'
            ]
          },{
            type: "multiselect",
            value: "deadlift_assistance",
            options: [
              'Front Squat',
              'Olympic Squat',
              'Leg Press',
              'Lunges',
              'Stiff Leg Deadlifts',
              'Leg Extensions',
              'Leg Curls',
              'Good Mornings',
              'Snatch Grip Deadlifts',
              'Barbell Rows',
              'Dumbbell Rows',
              'Lat Pulldows',
              'Chest Supported Rows',
              'Shrugs',
              'Abs',
              'Glute Ham Raise',
              'Pullups'
            ]
          }
       ],
        type: 'Powerlifting'
      }*/
  ],
  types: [
      'Deadlift Specific',
      'Powerlifting',
      'Squat Specific',
      'Unspecified'
  ]
};
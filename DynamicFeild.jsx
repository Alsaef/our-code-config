import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';

function DynamicFeild() {
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      email: '',
      photo: '',
      skills: [''],
      education: ['']
    }
  });

  const { fields: skillFields, append: addSkill, remove: removeSkill } = useFieldArray({
    control,
    name: 'skills'
  });

  const { fields: educationFields, append: addEducation, remove: removeEducation } = useFieldArray({
    control,
    name: 'education'
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4">
      <h2 className="text-xl font-bold mb-4">Dynamic Skill and Education Form</h2>

      {/* Static Input Fields */}
      <input
        {...register('name')}
        placeholder="Name"
        className="block border p-2 mb-2 rounded w-full"
      />
      <input
        {...register('email')}
        type="email"
        placeholder="Email"
        className="block border p-2 mb-2 rounded w-full"
      />
      <input
        {...register('photo')}
        placeholder="Photo URL"
        className="block border p-2 mb-2 rounded w-full"
      />

      {/* Dynamic Skills Section */}
      <h4 className="text-md font-medium mb-2">Skills</h4>
      {skillFields.map((skill, index) => (
        <div key={skill.id} className="flex gap-2 mb-2">
          <input
            {...register(`skills.${index}`)}
            placeholder={`Skill ${index + 1}`}
            className="border p-2 rounded w-full"
          />
          <button
            type="button"
            onClick={() => removeSkill(index)}
            className="bg-red-500 text-white px-2 rounded"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => addSkill('')}
        className="bg-green-500 text-white px-4 py-1 rounded mb-4"
      >
        Add Skill
      </button>

      {/* Dynamic Education Section */}
      <h4 className="text-md font-medium mb-2">Education</h4>
      {educationFields.map((edu, index) => (
        <div key={edu.id} className="flex gap-2 mb-2">
          <input
            {...register(`education.${index}`)}
            placeholder={`Education ${index + 1}`}
            className="border p-2 rounded w-full"
          />
          <button
            type="button"
            onClick={() => removeEducation(index)}
            className="bg-red-500 text-white px-2 rounded"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => addEducation('')}
        className="bg-green-500 text-white px-4 py-1 rounded"
      >
        Add Education
      </button>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
        Submit
      </button>
    </form>
  );
}

export default DynamicFeild;

const Project = require('../models/Project');
exports.getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    next(error);
  }
};
exports.getProject = async (req, res, next) => {
  try {
    
    const project = await Project.findById(req.params.id);

   
    if (!project) {
      res.status(404); 
      throw new Error('Project not found');
    }

    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
};


exports.createProject = async (req, res, next) => {
  try {
    
    req.body.user = req.user._id;

 
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
};


exports.updateProject = async (req, res, next) => {
  try {

    let project = await Project.findById(req.params.id);

    if (!project) {
      res.status(404);
      throw new Error('Project not found');
    }

    
    if (project.user.toString() !== req.user._id.toString()) {
      res.status(403); 
      throw new Error('Not authorized to update this project');
    }

    
    project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
};
exports.deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      res.status(404);
      throw new Error('Project not found');
    }

    if (project.user.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized to delete this project');
    }

    await project.remove();
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    next(error);
  }
};
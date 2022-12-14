import { projectState } from '../state/project.state';
import { Component } from '../types/component.types';
import { DragTarget } from '../types/drag-drop.types';
import { Project, ProjectStatus } from '../types/project.types';
import { ProjectItem } from './projectItem';

export class ProjectList
	extends Component<HTMLDivElement, HTMLElement>
	implements DragTarget
{
	assignedProjects: Project[];

	constructor(private type: 'active' | 'finished') {
		super('project-list', 'app', false, `${type}-projects`);
		this.assignedProjects = [];

		this.configure();
		this.renderContent();
	}

	dragOverHandler(event: DragEvent): void {
		if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
			event.preventDefault();
			const listEl = this.element.querySelector('ul')!;
			listEl.classList.add('droppable');
		}
	}

	dropHandler(event: DragEvent): void {
		const projId = event.dataTransfer!.getData('text/plain');
		projectState.moveProject(
			projId,
			this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished
		);
	}

	dragLeaveHandler(_: DragEvent): void {
		const listEl = this.element.querySelector('ul')!;
		listEl.classList.remove('droppable');
	}

	configure(): void {
		this.element.addEventListener('dragover', this.dragOverHandler.bind(this));

		this.element.addEventListener(
			'dragleave',
			this.dragLeaveHandler.bind(this)
		);

		this.element.addEventListener('drop', this.dropHandler.bind(this));

		projectState.addListener((projects: Project[]) => {
			const relevantProjects = projects.filter((proj) => {
				if (this.type === 'active') {
					return proj.status === ProjectStatus.Active;
				}
				return proj.status === ProjectStatus.Finished;
			});
			this.assignedProjects = relevantProjects;
			this.renderProjects();
		});
	}

	renderContent() {
		const listId = `${this.type}-projects-list`;
		this.element.querySelector('ul')!.id = listId;
		this.element.querySelector('h2')!.textContent =
			this.type.toUpperCase() + ' PROJECTS';
	}

	private renderProjects() {
		const listEl = document.getElementById(
			`${this.type}-projects-list`
		)! as HTMLUListElement;
		listEl.innerHTML = '';
		for (const projItem of this.assignedProjects) {
			new ProjectItem(this.element.querySelector('ul')!.id, projItem);
		}
	}
}

import { ICategory } from './../../types/category.interface';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faPencil, faPencilSquare, faPersonCirclePlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  deleteIcon = faTimes
  editIcon = faPencilSquare

  categoryFormMode: "Submit" | "Update" = "Submit"
  selectedCategoryEditing: ICategory | undefined

  categoryForm: FormGroup

  constructor(protected readonly dbService: DbService) {
    this.categoryForm = new FormGroup({
      name: new FormControl("", [Validators.required])
    })
  }

  ngOnInit(): void {
  }

  switchSubmitMode(category: ICategory) {
    this.categoryFormMode = "Update"
    this.selectedCategoryEditing = category
    this.categoryForm.controls['name'].setValue(category.category)
  }

  submitCategory() {
    if (this.categoryForm.valid) {
      if (this.categoryFormMode == 'Submit') {
        this.dbService.createCategory(this.categoryForm.controls['name'].value).subscribe(() => {
        })
      }
      if (this.categoryFormMode == 'Update' && this.selectedCategoryEditing) {
        this.dbService.updateCategory(this.selectedCategoryEditing?.id, { "category": this.categoryForm.controls['name'].value }).subscribe(() => {
          this.resetForm()
        })
      }
    }
  }

  resetForm() {
    this.categoryFormMode = "Submit"
    this.categoryForm.reset()
  }

  deleteCategoryHandler(category: ICategory) {
    this.dbService.deleteCategory(category.id).subscribe(() => {
    })
  }
}

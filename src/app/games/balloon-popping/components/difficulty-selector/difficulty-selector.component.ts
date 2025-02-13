import { Component, EventEmitter, Output } from "@angular/core";
import { LevelService, Difficulty } from "../../services/level.service";

@Component({
  selector: "app-difficulty-selector",
  templateUrl: "./difficulty-selector.component.html",
  styleUrls: ["./difficulty-selector.component.scss"]
})
export class DifficultySelectorComponent {
  difficulties: Difficulty[] = ["Easy", "Normal", "Hard"];
  selectedDifficulty: Difficulty;

  @Output() difficultyChanged = new EventEmitter<Difficulty>();

  constructor(private levelService: LevelService) {
    this.selectedDifficulty = this.levelService.getDifficulty();
  }

  selectDifficulty(difficulty: Difficulty) {
    this.selectedDifficulty = difficulty;
    this.levelService.setDifficulty(difficulty);
    this.difficultyChanged.emit(difficulty);
  }
}

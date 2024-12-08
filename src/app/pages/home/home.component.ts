import { Component, OnInit, OnDestroy } from '@angular/core';
import { GeminiService } from '../../core/services/gemini.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Generate } from '../../core/models/generated-interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  prompt: string = '';
  generatedContent: Generate[] = [];
  conversationActive: boolean = false;
  timeout: any;

  constructor(private geminiService: GeminiService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  startConversation() {
    this.conversationActive = true;
    this.generatedContent = [];
    this.prompt = 'Olá, tudo bem?';
    this.geminiFirst(this.prompt);
  }

  stopConversation() {
    this.conversationActive = false;
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  geminiFirst(prompt: string) {
    this.geminiService.geminiFirst(prompt).subscribe(
      (response) => {
        const message = response.candidates[0].content.parts[0].text;
        this.generatedContent.push({ ia: 'IA 1', text: message, cor: "#CC0000", left: false });

        if (this.conversationActive) {
          this.timeout = setTimeout(() => {
            this.geminiSecond(message);
          }, 2000);
        }
      },
      (error) => {
        console.error('Error generating content:', error);
      }
    );
  }

  geminiSecond(prompt: string) {
    this.geminiService.geminiSecond(prompt).subscribe(
      (response) => {
        const message = response.candidates[0].content.parts[0].text;
        this.generatedContent.push({ ia: 'IA 2', text: message, cor: "#3d85c6", left: true  });

        if (this.conversationActive) {
          this.timeout = setTimeout(() => {
            this.geminiFirst(message);
          }, 2000);
        }
      },
      (error) => {
        console.error('Error generating content:', error);
      }
    );
  }
}

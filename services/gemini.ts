
import { GoogleGenAI, Type } from "@google/genai";
import { ResumeAnalysis, SkillGapAnalysis, RoadmapStep, VoiceAnalysis, InterviewPrep, ShortlistResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeResume = async (resumeText: string, domain: string): Promise<ResumeAnalysis> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Analyze this resume for the domain: ${domain}. Resume Content: ${resumeText}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.NUMBER },
          atsScore: { type: Type.NUMBER },
          strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
          weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
          tips: { type: Type.ARRAY, items: { type: Type.STRING } },
          skills: { type: Type.ARRAY, items: { type: Type.STRING } },
          domain: { type: Type.STRING }
        },
        required: ["score", "atsScore", "strengths", "weaknesses", "tips", "skills", "domain"]
      }
    }
  });
  return JSON.parse(response.text.trim());
};

export const getSkillGapAnalysis = async (userSkills: string[], targetRole: string): Promise<SkillGapAnalysis> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Compare user skills [${userSkills.join(", ")}] with requirements for a ${targetRole} role. For missing skills, suggest a project or course.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          matchPercentage: { type: Type.NUMBER },
          matchingSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
          missingSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
          prioritizedMissingSkills: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                skill: { type: Type.STRING },
                priority: { type: Type.STRING },
                suggestions: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      type: { type: Type.STRING },
                      title: { type: Type.STRING },
                      provider: { type: Type.STRING }
                    }
                  }
                }
              },
              required: ["skill", "priority"]
            }
          }
        },
        required: ["matchPercentage", "matchingSkills", "missingSkills", "prioritizedMissingSkills"]
      }
    }
  });
  return JSON.parse(response.text.trim());
};

export const convertJDToInterview = async (jdText: string): Promise<InterviewPrep> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Convert this Job Description into a role-specific interview preparation guide: ${jdText}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          role: { type: Type.STRING },
          questions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                question: { type: Type.STRING },
                focus: { type: Type.STRING },
                difficulty: { type: Type.STRING }
              },
              required: ["question", "focus", "difficulty"]
            }
          }
        },
        required: ["role", "questions"]
      }
    }
  });
  return JSON.parse(response.text.trim());
};

export const generateShortlist = async (
  jobRole: string, 
  mandatorySkills: string[], 
  candidates: any[], 
  biasFree: boolean
): Promise<ShortlistResponse> => {
  const prompt = `Rank and shortlist candidates for the role of ${jobRole}. 
  Mandatory Requirements: [${mandatorySkills.join(", ")}].
  ${biasFree ? "IMPORTANT: This is a BIAS-FREE analysis. Do not consider names, gender, age, or specific school prestige. Evaluate purely on technical skills, projects, and demonstrated competency." : ""}
  Talent Pool: ${JSON.stringify(candidates)}`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          candidates: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                name: { type: Type.STRING, description: "Candidate identifier" },
                score: { type: Type.NUMBER, description: "Match percentage based on mandatory skills and context" },
                reasoning: { type: Type.STRING, description: "Detailed AI explanation for this ranking" },
                technicalMatch: { type: Type.ARRAY, items: { type: Type.STRING } },
                softSkillAnalysis: { type: Type.STRING },
                requirementGaps: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Specific missing mandatory skills" }
              },
              required: ["id", "name", "score", "reasoning", "technicalMatch", "softSkillAnalysis", "requirementGaps"]
            }
          },
          summary: { type: Type.STRING }
        },
        required: ["candidates", "summary"]
      }
    }
  });
  return JSON.parse(response.text.trim());
};

export const analyzeVoiceConfidence = async (audioBase64: string): Promise<VoiceAnalysis> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: {
      parts: [
        { inlineData: { data: audioBase64, mimeType: 'audio/webm' } },
        { text: "Analyze this interview audio. Output MUST be valid JSON." }
      ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          confidenceScore: { type: Type.NUMBER },
          fillerWordCount: { type: Type.NUMBER },
          speakingSpeed: { type: Type.STRING },
          hesitationNotes: { type: Type.STRING },
          tips: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["confidenceScore", "fillerWordCount", "speakingSpeed", "hesitationNotes", "tips"]
      }
    }
  });
  return JSON.parse(response.text.trim());
};

export const generateRoadmap = async (missingSkills: string[], targetRole: string): Promise<RoadmapStep[]> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Generate a 4-week learning roadmap for ${targetRole} missing [${missingSkills.join(", ")}].`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            week: { type: Type.NUMBER },
            title: { type: Type.STRING },
            topics: { type: Type.ARRAY, items: { type: Type.STRING } },
            practiceIdeas: { type: Type.ARRAY, items: { type: Type.STRING } },
            resources: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: { name: { type: Type.STRING }, url: { type: Type.STRING } },
                required: ["name", "url"]
              }
            }
          },
          required: ["week", "title", "topics", "practiceIdeas", "resources"]
        }
      }
    }
  });
  return JSON.parse(response.text.trim());
};

---
title: "LoftQ: LoRA-Fine-Tuning-Aware Quantization for Large Language Models"
authors:
- admin
- Yifan Yu
- Chen Liang
- Pengcheng He
- Nikos Karampatziakis
- Weizhu Chen
- Tuo Zhao
author_notes:
- "Equal contribution"
- "Equal contribution"
date: "2024-05-07T00:00:00Z"
doi: ""

# Schedule page publish date (NOT publication's date).
publishDate: "2024-05-07T00:00:00Z"

# Publication type.
# Legend: 0 = Uncategorized; 1 = Conference paper; 2 = Journal article;
# 3 = Preprint / Working Paper; 4 = Report; 5 = Book; 6 = Book section;
# 7 = Thesis; 8 = Patent
publication_types: ["1"]

# Publication name and optional abbreviated publication name.
publication: "International Conference on Learning Representations"
publication_short: "ICLR"

abstract: Quantization is an indispensable technique for serving Large Language Models (LLMs) and has recently found its way into LoRA fine-tuning. In this work we focus on the scenario where quantization and LoRA fine-tuning are applied together on a pre-trained model. In such cases it is common to observe a consistent gap in the performance on downstream tasks between full fine-tuning and quantization plus LoRA fine-tuning approach. In response, we propose LoftQ (LoRA-Fine-Tuning-aware Quantization), a novel quantization framework that simultaneously quantizes an LLM and finds a proper low-rank initialization for LoRA fine-tuning. Such an initialization alleviates the discrepancy between the quantized and full-precision model and significantly improves generalization in downstream tasks. We evaluate our method on natural language understanding, question answering, summarization, and natural language generation tasks. Experiments show that our method is highly effective and outperforms existing quantization methods, especially in the challenging 2-bit and 2/4-bit mixed precision regimes.

# Summary. An optional shortened abstract.
summary: We propose a smart quantized initialization for LoRA fine-tuning.

tags:
- Source Themes
featured: true

links:
- name: PDF
  url: https://arxiv.org/abs/2310.08659

- name: Code
  url: https://github.com/yxli2123/LoftQ

- name: Slides
  url: slides_iclr2024_loftq.pdf

- name: Poster
  url: poster_iclr2024_loftq.pdf

- name: Models
  url: https://huggingface.co/LoftQ


# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder. 
image:
  caption: 'Illustration'
  focal_point: ""
  preview_only: false

# Associated Projects (optional).
#   Associate this publication with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `internal-project` references `content/project/internal-project/index.md`.
#   Otherwise, set `projects: []`.
projects: []

# Slides (optional).
#   Associate this publication with Markdown slides.
#   Simply enter your slide deck's filename without extension.
#   E.g. `slides: "example"` references `content/slides/example/index.md`.
#   Otherwise, set `slides: ""`.
# slides: slides_iclr2024_loftq.pdf
---

Fine-tuning a large language model (LLM) in your personal computer is not a dream. Even though we are so used to the LLM services that are deployed in the cloud, like chat-GPT or Claude, we still hope to finetune an LLM on our personal and private data. For example, design personalized travel itineraries, optimize our small business operations, etc. Yet, this power has traditionally been locked away, accessible only to those with rich computing resources, but today, I am telling you, you can train an LLM with 7 billion parameters within 16GB GPU memory (RTX 4080 for example)! Let’s see how it works.

To cram an LLM into a small GPU and finetune it, researchers utilize two techniques: **LoRA finetuning** and **quantization**. [LoRA](https://arxiv.org/abs/2106.09685) finetuning adds low-rank adapters to the pretrained weights that are frozen during finetuing. Since it only trains the adapter parameters, which are often less than 5% of the pretrained weights, it saves massive training memory, such as gradients and optimization states of trainable parameters. As the pretrained weight itself is still huge, researchers quantize the pretrained weight from 16 bits to 4 bits, which saves 75% of memory. 

The comparisons are shown in Figure 1. Combining these two techniques ([QLoRA](https://arxiv.org/abs/2305.14314)), one can finally finetune their LLMs on one single GPU. However, everything comes with price: <u>quantization brings discrepancy and the discrepancy will lower the finetuning performance</u>.

<img src="blog_fig1.png" alt="blog_fig1" style="zoom:30%;" />

​                                                      Figure 1. GPU memory comparison of different fine-tuning methods.

## LoftQ: bridge the quantization gap

Our approach, [LoftQ: LoRA-fine-tuning-aware Quantization](https://arxiv.org/abs/2310.08659), aims to bridge the quantization error gap. With the same architecture as QLoRA: a quantized backbone and LoRA adapters, our method takes the subsequent LoRA finetuning into consideration when applying quantization. Specifically, we minimize the following objective to obtain a good initialization for LoRA fine-tuning:
$$
\underset{Q, A, B}{\mathrm{min}} ||W - Q - AB^{\top}||_\mathrm{F}^2
$$
Intuitively, our method redistributes the knowledge in the pretrained weight to both the quantized weight and the low-rank adapter. In contrast to QLoRA, only the quantized backbone contains the pretraining knowledge, some of which is even lost during quantization. Technically, our method provides a closer initialization (the sum of the quantized backbone and low-rank adapters) to the pretrained weight than QLoRA, which makes the training start from a more appropriate point.

We solve the optimization problem by applying quantization and low-rank approximation in an alternating way. We fix the low-rank adapter $A,B$ and obtain $Q$ by quantizing $W-AB^{\top}$. We then fix $Q$ and obtain $A, B$ by low-rank approximation of $W-Q$​ using SVD. We repeat these two processes until the objective is minimized (usually less than 5 rounds). 

Advantages of the alternating algorithm:

- It does not involve any calibration data, compared to some post-training methods.
- It can be applied to each weight matrix in parallel, which saves a lot of time. 
- Once the optimal $Q, A, B$ are obtained, one can reuse it for many different downstream tasks. Fortunately, we have provided the initialization of some popular models for you. Check it out on our [Huggingface model repository](https://huggingface.co/LoftQ)

## How well does LoftQ work?

We have tested our method in different mainstream architecture of models: encoder-only (e.g., DeBERTa), encoder-decoder (e.g., bart-large), and encoder-only (e.g., LLAMA, Mistral, Phi-2). 

- We observe our method is consistently better than QLoRA. 
- In extreme low-bit cases, 2-bit quantization for example, LoftQ converges to a reasonable performance, while QLoRA sometimes does not converge.
- We also find that the training loss of LoftQ decays faster than QLoRA, so we can use less training iterations and save energy. Take finetuning Phi-2 on GSM8K as an example, LoftQ needs 6 epochs while QLoRA needs 8 epochs.

<img src="../../../../../Desktop/glue.png" alt="glue" style="zoom:40%;" />

​					Figure 2. Results of fine-tuning DeBERTa-base on GLUE and ANLI dataset.

<img src="../../../../../Desktop/summarization.png" alt="summarization" style="zoom:30%;" />

​							Figure 3. Results of finetuning BART-large on summarization tasks.

### Phi-2 on GSM8K

| Model | Bits | Rank | LoRA Initial           | GSM8K    |
| ----- | ---- | ---- | ---------------------- | -------- |
| Phi-2 | 16   | -    | Full model fine-tuning | 66.8±1.2 |
| Phi-2 | 16   | 64   | Gaussian + 0           | 64.8±0.5 |
| Phi-2 | 4    | 64   | Gaussian + 0 (QLoRA)   | 60.2±0.6 |
| Phi-2 | 4    | 64   | LoftQ                  | 64.1±0.7 |

​						Figure 4. Results of finetuning LLAMA models on WikiText and GSM8K datasets.

## How to use LoftQ?

### Use cases

- Using LoftQ for finetuning Phi-2 model (around 3 billion parameters) on consumer hardware with 11GB of RAM, such as Nvidia GeForce RTX 2080 Ti, Nvidia GeForce RTX 3080, etc. 
- Using LoftQ for finetuning Mistral-7B model (around 7 billion parameters) on consumer hardware with 16GB of RAM, such as Nvidia GeForce RTX 4080. You can also use [Deepspeed Zero 3](https://www.deepspeed.ai/2021/03/07/zero3-offload.html) to cram it into one 11GB GPU.

### Example

Let’s take finetuning Phi-2 as an example.

1. Let's get the necessary imports

   ```python
   import torch
   from transformers import AutoModelForCausalLM
   from peft import PeftModel
   from BitsAndBytesConfig  # new
   ```

2. Load the quantized backbone $Q$ obtained by LoftQ.

   ```python
   # fetch the MODEL_ID at https://huggingface.co/LoftQ
   MODEL_ID = "LoftQ/phi-2-4bit-64rank"
   quant_config = BitsAndBytesConfig(load_in_4bit=True, bnb_4bit_quant_type='nf4')  # new
   base_model = AutoModelForCausalLM.from_pretrained(
       MODEL_ID, 
       quantization_config=quant_config,  # new
   )
   ```

3. Load the low-rank adapter $A, B$ obtained by LoftQ.

   ```python
   peft_model = PeftModel.from_pretrained(
       base_model,
       MODEL_ID,
       subfolder="loftq_init",  # choose the LoftQ adapter
       is_trainable=True,
   )
   ```

That's it! The rest of the training loop remains the same. Please refer to the [train_gsm8k.py](https://github.com/yxli2123/LoftQ/blob/main/train_gsm8k.py) for an end-to-end example.

We have provided the initialization of several popular models, such as BART-large, LLAMA-2 series, Mistral-7B, Phi-2. Check it out on our [Huggingface model repository](https://huggingface.co/LoftQ). 

## Acknowledgements

We would like to thank Yifan Yu for conducting the exploration of LoftQ on encoder-only models. We would like to thank Chen Liang, Pengcheng He, Nikos Karampatziakis, Weizhu Chen, Tuo Zhao for their research collaboration.

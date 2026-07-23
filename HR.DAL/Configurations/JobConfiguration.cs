using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HR.DAL.Entities;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HR.DAL.Configurations
{
    public class JobConfiguration : IEntityTypeConfiguration<Job>
    {
        public void Configure(EntityTypeBuilder<Job> builder)
        {
            builder.HasKey(j => j.Id);
            builder.Property(j => j.Title)
                .IsRequired()
                .HasMaxLength(100);
            builder.Property(j => j.Description)
                .IsRequired()
                .HasMaxLength(2000);
            builder.Property(j => j.Department)
                .IsRequired()
                .HasMaxLength(100);
            builder.Property(j => j.Location)
                .IsRequired()
                .HasMaxLength(100);
            builder.Property(j => j.employmentType)
                .IsRequired();
            builder.Property(j => j.workplaceType)
                .IsRequired();
            builder.Property(j => j.ExperienceLevel)
                .IsRequired();
            builder.Property(j => j.MinYearsOfExperience)
                .IsRequired();
         
            builder.Property(j => j.PostedDate)
                .IsRequired()
                .HasDefaultValueSql("GETDATE()");
            builder.Property(j => j.ClosingDate)
                .IsRequired(false);
            builder.Property(j => j.IsActive)
                .IsRequired()
                .HasDefaultValue(true);
            


        }
    }
}
